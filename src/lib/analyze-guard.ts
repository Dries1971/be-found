import "server-only";
import { createHmac } from "node:crypto";
import type { Sql } from "postgres";
import getDb from "@/lib/db";

/**
 * Abuse protection for the public page analysis form.
 *
 * Every live analysis costs API quota and scraper capacity, so a request
 * must pass three gates before we call the API:
 *   1. Cloudflare Turnstile (bot check), fail-closed when not configured
 *   2. A per-visitor limit (hashed IP, sliding hour)
 *   3. A site-wide daily cap
 * Limits are enforced in Postgres under an advisory lock, so they hold
 * across replicas and concurrent requests (an in-memory map would not).
 */

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** Single advisory-lock key for all reservations (short transaction, low volume). */
const RESERVATION_LOCK_KEY = 74_201_119;

function intFromEnv(name: string, fallback: number): number {
  const value = Number.parseInt(process.env[name] ?? "", 10);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

export function limits() {
  return {
    perVisitorPerHour: intFromEnv("ANALYZE_LIMIT_PER_IP_HOUR", 3),
    perDay: intFromEnv("ANALYZE_LIMIT_PER_DAY", 300),
  };
}

/**
 * Client IP as seen behind Cloudflare. Cloudflare sets CF-Connecting-IP;
 * x-forwarded-for is the fallback for local development.
 */
export function clientIp(headers: Headers): string {
  return (
    headers.get("cf-connecting-ip")?.trim() ||
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

/** We never store raw IPs: keyed hash, so it cannot be reversed with a rainbow table. */
export function hashVisitor(ip: string): string {
  const secret =
    process.env.ANALYZE_IP_SALT ?? process.env.PAGE_ANALYSIS_API_KEY ?? "";
  return createHmac("sha256", secret).update(ip).digest("hex");
}

export type TurnstileOutcome = "ok" | "failed" | "not_configured";

export async function verifyTurnstile(
  token: string,
  ip: string,
): Promise<TurnstileOutcome> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return "not_configured";
  if (!token) return "failed";

  const body = new URLSearchParams({ secret, response: token });
  if (ip !== "unknown") body.set("remoteip", ip);

  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success ? "ok" : "failed";
  } catch (err) {
    console.error("[analyze] turnstile verify error", err);
    return "failed";
  }
}

export type ReservationOutcome =
  | { ok: true; reservationId: number }
  | { ok: false; reason: "visitor_limit" | "daily_limit" };

/**
 * Atomically checks both limits and inserts a reservation row. The row
 * counts against the limits right away, so parallel submits cannot slip
 * past the check. Call releaseReservation() when the API call fails.
 */
export async function reserveAnalysis(input: {
  visitorHash: string;
  url: string;
  locale: string;
}): Promise<ReservationOutcome> {
  const { perVisitorPerHour, perDay } = limits();
  const sql = getDb();

  return sql.begin(async (transaction) => {
    // postgres.js types TransactionSql via Omit<Sql>, which drops the call
    // signature (porsager/postgres#1087); at runtime it is a tagged template.
    const tx = transaction as unknown as Sql;
    await tx`SELECT pg_advisory_xact_lock(${RESERVATION_LOCK_KEY})`;

    const [{ visitor, day }] = await tx<{ visitor: number; day: number }[]>`
      SELECT
        COUNT(*) FILTER (
          WHERE visitor_hash = ${input.visitorHash}
            AND created_at > NOW() - INTERVAL '1 hour'
        )::int AS visitor,
        COUNT(*) FILTER (
          WHERE created_at > NOW() - INTERVAL '24 hours'
        )::int AS day
      FROM page_analyses
    `;

    if (visitor >= perVisitorPerHour) return { ok: false, reason: "visitor_limit" } as const;
    if (day >= perDay) return { ok: false, reason: "daily_limit" } as const;

    const [row] = await tx<{ id: number }[]>`
      INSERT INTO page_analyses (visitor_hash, url, locale, status)
      VALUES (${input.visitorHash}, ${input.url}, ${input.locale}, 'reserved')
      RETURNING id
    `;
    return { ok: true, reservationId: row.id } as const;
  });
}

/**
 * Links the reservation to the API analysis id. If the API returned an
 * analysis we already know (same visitor + URL within the hour, via the
 * idempotency key), the reservation is dropped so it does not count twice.
 */
export async function confirmReservation(
  reservationId: number,
  analysisId: string,
  status: string,
): Promise<void> {
  const sql = getDb();
  try {
    await sql`
      UPDATE page_analyses
      SET analysis_id = ${analysisId}, status = ${status}, updated_at = NOW()
      WHERE id = ${reservationId}
    `;
  } catch (err) {
    // 23505 = unique_violation on analysis_id: this analysis is already ours.
    if ((err as { code?: string }).code === "23505") {
      await releaseReservation(reservationId);
      return;
    }
    throw err;
  }
}

export async function releaseReservation(reservationId: number): Promise<void> {
  const sql = getDb();
  await sql`DELETE FROM page_analyses WHERE id = ${reservationId} AND analysis_id IS NULL`;
}

/** Only analyses created through this site can be viewed here. */
export async function isKnownAnalysis(analysisId: string): Promise<boolean> {
  const sql = getDb();
  const [row] = await sql<{ id: number }[]>`
    SELECT id FROM page_analyses WHERE analysis_id = ${analysisId}
  `;
  return Boolean(row);
}

export async function recordStatus(
  analysisId: string,
  status: string,
  score: number | null,
): Promise<void> {
  const sql = getDb();
  await sql`
    UPDATE page_analyses
    SET status = ${status}, score = ${score}, updated_at = NOW()
    WHERE analysis_id = ${analysisId}
      AND (status IS DISTINCT FROM ${status} OR score IS DISTINCT FROM ${score})
  `;
}
