import postgres from "postgres";

let sql: ReturnType<typeof postgres>;

/**
 * Lazy database connection — only connects on first query.
 * Prevents build-time failures when DATABASE_URL is a placeholder.
 */
export function getDb() {
  if (!sql) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL environment variable is required");
    }
    sql = postgres(connectionString, {
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10,
    });
  }
  return sql;
}

export default getDb;
