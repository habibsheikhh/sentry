import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { env } from "../config/env";

export const client = postgres(env.DATABASE_URL);

export const db = drizzle(client);

export async function checkDatabaseConnection() {
  return await client`SELECT 1 AS connected`;
}