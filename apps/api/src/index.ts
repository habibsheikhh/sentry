import { Elysia } from "elysia";
import { checkDatabaseConnection } from "./db";

const PORT = Number(Bun.env.PORT ?? 3000);

const app = new Elysia()
  .get("/", () => ({
    message: "Welcome to Sentry API",
    status: "running",
  }))
  .get("/health", () => ({
    status: "ok",
    service: "sentry-api",
    timestamp: new Date().toISOString(),
  }))
  .get("/health/db", async ({ set }) => {
    try {
      await checkDatabaseConnection();

      return {
        status: "ok",
        database: "connected",
      };
    } catch (error) {
      console.error("Database connection failed:", error);

      set.status = 503;

      return {
        status: "error",
        database: "disconnected",
      };
    }
  })
  .listen(PORT);

console.log(
  `Sentry API running at http://localhost:${app.server?.port}`
);