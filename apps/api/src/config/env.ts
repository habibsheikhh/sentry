const requiredEnv = ["DATABASE_URL"] as const;

for (const key of requiredEnv) {
  if (!Bun.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const env = {
  PORT: Number(Bun.env.PORT ?? 3000),
  DATABASE_URL: Bun.env.DATABASE_URL!,
  REDIS_HOST: Bun.env.REDIS_HOST ?? "127.0.0.1",
  REDIS_PORT: Number(Bun.env.REDIS_PORT ?? 6379),
};