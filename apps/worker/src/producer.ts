import { reviewQueue } from "./queues/review.queue";

async function main() {
  const job = await reviewQueue.add("review-pull-request", {
    repository: "habibsheikhh/sentry",
    pullRequestNumber: 1,
    author: "habib",
  });

  console.log("Job added successfully:", job.id);

  await reviewQueue.close();
}

main().catch((error) => {
  console.error("Failed to add job:", error);
  process.exitCode = 1;
});