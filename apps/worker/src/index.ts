import { Worker } from "bullmq";
import { redisConnection } from "./lib/redis";

const worker = new Worker(
  "pr-review",
  async (job) => {
    console.log("Processing job:", job.id);
    console.log("Job data:", job.data);

    // Actual AI code review logic will come later.

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Review completed:", job.id);

    return {
      success: true,
      message: "PR review processed successfully",
    };
  },
  {
    connection: redisConnection,
    concurrency: 5,
  }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, error) => {
  console.error(`Job ${job?.id} failed:`, error.message);
});

worker.on("error", (error) => {
  console.error("Worker error:", error);
});

console.log("Sentry background worker started");