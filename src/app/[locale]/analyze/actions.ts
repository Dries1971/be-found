"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { locales, type Locale } from "@/i18n/routing";
import {
  analysisLanguageFor,
  createAnalysis,
  PageAnalysisError,
} from "@/lib/page-analysis";
import {
  clientIp,
  confirmReservation,
  hashVisitor,
  releaseReservation,
  reserveAnalysis,
  verifyTurnstile,
} from "@/lib/analyze-guard";
import { normalizeAnalysisUrl } from "@/lib/analyze-url";

/** Keys into the `analyze` message namespace; the client shows the text. */
export type AnalyzeErrorKey =
  | "error_url"
  | "error_bot"
  | "error_visitor_limit"
  | "error_daily_limit"
  | "error_busy"
  | "error_generic";

export interface AnalyzeFormState {
  error: AnalyzeErrorKey | null;
  value: string;
  /** Set on success; the client navigates to the report. */
  analysisId?: string;
}

/**
 * Runs on the server, so the API key never reaches the browser. Order of
 * checks: cheap local validation → bot check → limits → API call.
 */
export async function submitAnalysis(
  _prev: AnalyzeFormState,
  formData: FormData,
): Promise<AnalyzeFormState> {
  const value = String(formData.get("url") ?? "").trim();
  const rawLocale = String(formData.get("locale") ?? "en");
  const locale: Locale = (locales as readonly string[]).includes(rawLocale)
    ? (rawLocale as Locale)
    : "en";

  const url = normalizeAnalysisUrl(value);
  if (!url) return { error: "error_url", value };

  const requestHeaders = await headers();
  const ip = clientIp(requestHeaders);

  const turnstile = await verifyTurnstile(
    String(formData.get("cf-turnstile-response") ?? ""),
    ip,
  );
  if (turnstile === "not_configured") {
    // Fail closed: without a bot check the live key is open to abuse.
    console.error("[analyze] TURNSTILE_SECRET_KEY is not set; refusing analysis");
    return { error: "error_generic", value };
  }
  if (turnstile === "failed") return { error: "error_bot", value };

  const visitorHash = hashVisitor(ip);

  let reservationId: number;
  try {
    const reservation = await reserveAnalysis({ visitorHash, url, locale });
    if (!reservation.ok) {
      return {
        error: reservation.reason === "visitor_limit" ? "error_visitor_limit" : "error_daily_limit",
        value,
      };
    }
    reservationId = reservation.reservationId;
  } catch (err) {
    console.error("[analyze] reservation failed", err);
    return { error: "error_generic", value };
  }

  let analysisId: string;
  try {
    // Same visitor + same URL within the hour = same analysis, so double
    // clicks and retries cost no quota.
    const hour = new Date().toISOString().slice(0, 13);
    const idempotencyKey = createHash("sha256")
      .update(`${visitorHash}|${url}|${hour}`)
      .digest("hex");

    const submitted = await createAnalysis(url, analysisLanguageFor(locale), idempotencyKey);
    await confirmReservation(reservationId, submitted.id, submitted.status);
    analysisId = submitted.id;
  } catch (err) {
    await releaseReservation(reservationId).catch(() => undefined);
    const code = err instanceof PageAnalysisError ? err.code : "unknown";
    console.error(
      "[analyze] submit failed",
      code,
      err instanceof PageAnalysisError ? err.requestId : err,
    );
    const error: AnalyzeErrorKey =
      code === "invalid_request" ||
      code === "target_not_allowed" ||
      code === "target_unresolvable"
        ? "error_url"
        : code === "quota_exceeded"
          ? "error_daily_limit"
          : code === "rate_limited"
            ? "error_busy"
            : "error_generic";
    return { error, value };
  }

  // No redirect() here: in Next 16.1 an action redirect to the dynamic
  // child route /analyze/[id] is aborted client-side (verified in a prod
  // build; router.push to the same URL works). The form needs JS anyway
  // (Turnstile), so client navigation loses no progressive enhancement and
  // keeps the action response tiny instead of inlining the whole report.
  return { error: null, value, analysisId };
}
