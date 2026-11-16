import { Queue } from "bullmq";
import { redisConnection } from "../lib/redis";

export const reviewQueue = new Queue("pr-review", {
  connection: redisConnection,
});

console.log("Sentry review queue initialized");