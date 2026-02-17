import { NextResponse } from "next/server";
import getDb from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token || token.length !== 64) {
    return NextResponse.redirect(new URL("/?confirmed=invalid", request.url));
  }

  try {
    const sql = getDb();
    const rows = await sql`
      SELECT id, token_expires_at FROM subscribers
      WHERE token = ${token} AND status = 'pending'
    `;

    if (rows.length === 0) {
      return NextResponse.redirect(new URL("/?confirmed=invalid", request.url));
    }

    const subscriber = rows[0];
    const expiresAt = new Date(subscriber.token_expires_at);

    if (expiresAt < new Date()) {
      return NextResponse.redirect(new URL("/?confirmed=expired", request.url));
    }

    // Confirm the subscription
    await sql`
      UPDATE subscribers
      SET status = 'confirmed',
          confirmed_at = NOW(),
          token = NULL,
          token_expires_at = NULL,
          updated_at = NOW()
      WHERE id = ${subscriber.id}
    `;

    return NextResponse.redirect(new URL("/?confirmed=success", request.url));
  } catch (error) {
    console.error("Newsletter confirmation error:", error);
    return NextResponse.redirect(new URL("/?confirmed=error", request.url));
  }
}
