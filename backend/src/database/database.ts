import "dotenv/config";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}

export const pool = new Pool({
  connectionString,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export async function testDatabaseConnection(): Promise<void> {
  await pool.query("SELECT 1");
  console.log("Connected to PostgreSQL successfully!");
}

export async function closeDatabaseConnection(): Promise<void> {
  await pool.end();
  console.log("PostgreSQL connection pool closed.");
}
