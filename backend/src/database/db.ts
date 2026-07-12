import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  // Required for Render PostgreSQL
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

export async function connectDB() {
  try {
    const client = await pool.connect();

    console.log("✅ PostgreSQL Connected");

    client.release();
  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error);
    process.exit(1);
  }
}