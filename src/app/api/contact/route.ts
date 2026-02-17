import { NextResponse } from "next/server";
import { z } from "zod";
import sql from "@/lib/db";

const contactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  company: z.string().max(200).optional().default(""),
  message: z.string().min(10).max(5000),
  locale: z.string().min(2).max(5).optional().default("en"),
  // Honeypot — must be empty
  website: z.string().max(0).optional().default(""),
});

// Simple in-memory rate limiting (per IP, 5 requests per hour)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3600_000 });
    return false;
  }

  if (entry.count >= 5) {
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
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: result.error.flatten() },
        { status: 400 },
      );
    }

    const { name, email, company, message, locale, website } = result.data;

    // Honeypot check — if filled, silently accept (don't reveal to bots)
    if (website) {
      return NextResponse.json({ success: true });
    }

    // Time-based bot check — reject submissions faster than 2 seconds
    const submittedAt = request.headers.get("x-form-started");
    if (submittedAt) {
      const elapsed = Date.now() - parseInt(submittedAt, 10);
      if (elapsed < 2000) {
        // Too fast — likely a bot, silently accept
        return NextResponse.json({ success: true });
      }
    }

    // Save to database
    await sql`
      INSERT INTO contact_submissions (name, email, company, message, locale)
      VALUES (${name}, ${email}, ${company}, ${message}, ${locale})
    `;

    // TODO: Send email notification via TransIP SMTP when ED-7 is resolved
    // For now, submissions are saved to the database and can be retrieved manually.

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
