import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const databaseUrl = Bun.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined");
}

export const client = postgres(databaseUrl);

export const db = drizzle(client);

export async function checkDatabaseConnection() {
  return await client`SELECT 1 AS connected`;
}