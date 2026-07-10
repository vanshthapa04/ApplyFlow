import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "applyflow",
  port: 5432,
});

export async function connectDB() {
  const client = await pool.connect();

  console.log("✅ PostgreSQL Connected");

  client.release();
}