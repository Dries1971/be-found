import { NextResponse } from "next/server";
import { z } from "zod";
import { randomBytes } from "crypto";
import getDb from "@/lib/db";

const subscribeSchema = z.object({
  email: z.string().email().max(320),
  locale: z.string().min(2).max(5).optional().default("en"),
  // Honeypot — must be empty
  website: z.string().max(0).optional().default(""),
});

// Simple in-memory rate limiting (per IP, 3 requests per hour)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3600_000 });
    return false;
  }

  if (entry.count >= 3) {
    return true;
  }

  entry.count++;
  return false;
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const result = subscribeSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    const { email, locale, website } = result.data;

    // Honeypot check
    if (website) {
      return NextResponse.json({ success: true });
    }

    // Generate confirmation token (double opt-in)
    const token = randomBytes(32).toString("hex");
    const tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const sql = getDb();

    // Upsert: if email exists and is pending, update token. If confirmed, ignore.
    const existing = await sql`
      SELECT id, status FROM subscribers WHERE email = ${email}
    `;

    if (existing.length > 0) {
      if (existing[0].status === "confirmed") {
        // Already subscribed — return success silently (don't leak info)
        return NextResponse.json({ success: true });
      }

      // Re-send confirmation: update token
      await sql`
        UPDATE subscribers
        SET token = ${token},
            token_expires_at = ${tokenExpiresAt.toISOString()},
            locale = ${locale},
            updated_at = NOW()
        WHERE email = ${email}
      `;
    } else {
      await sql`
        INSERT INTO subscribers (email, locale, status, token, token_expires_at)
        VALUES (${email}, ${locale}, 'pending', ${token}, ${tokenExpiresAt.toISOString()})
      `;
    }

    // TODO: Send confirmation email via TransIP SMTP when ED-7 is resolved
    // The email should contain a link: https://be-found.online/api/newsletter/confirm?token={token}
    // For now, subscribers are saved with 'pending' status.

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
