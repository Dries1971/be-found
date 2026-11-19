/**
 * Database migration script.
 * Run with: npx tsx src/lib/db/migrate.ts
 */
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL environment variable is required");
  process.exit(1);
}

const sql = postgres(connectionString);

async function migrate() {
  console.log("Running migrations...");

  // Subscribers table (newsletter double opt-in)
  await sql`
    CREATE TABLE IF NOT EXISTS subscribers (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      locale TEXT NOT NULL DEFAULT 'en',
      status TEXT NOT NULL DEFAULT 'pending',
      token TEXT,
      token_expires_at TIMESTAMPTZ,
      confirmed_at TIMESTAMPTZ,
      unsubscribed_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  console.log("  ✓ subscribers table");

  // Contact form submissions
  await sql`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      message TEXT NOT NULL,
      locale TEXT NOT NULL DEFAULT 'en',
      status TEXT NOT NULL DEFAULT 'new',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  console.log("  ✓ contact_submissions table");

  // Index on subscriber email for fast lookups
  await sql`
    CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers (email)
  `;

  // Index on subscriber status for filtering
  await sql`
    CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers (status)
  `;

  // Index on contact submissions status
  await sql`
    CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions (status)
  `;

  console.log("  ✓ indexes created");

  // Page analyses requested via /analyze (GEO-Score API). Doubles as the
  // rate-limit ledger: a row is reserved before the API call is made.
  // visitor_hash = HMAC of the client IP, never the raw IP.
  await sql`
    CREATE TABLE IF NOT EXISTS page_analyses (
      id SERIAL PRIMARY KEY,
      analysis_id TEXT UNIQUE,
      visitor_hash TEXT NOT NULL,
      url TEXT NOT NULL,
      locale TEXT NOT NULL DEFAULT 'en',
      status TEXT NOT NULL DEFAULT 'reserved',
      score INTEGER,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_page_analyses_visitor_created
      ON page_analyses (visitor_hash, created_at)
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_page_analyses_created
      ON page_analyses (created_at)
  `;
  console.log("  ✓ page_analyses table");

  console.log("Migrations complete.");

  await sql.end();
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
