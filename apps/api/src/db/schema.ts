
import {
  pgTable,
  pgEnum,
  uuid,
  text,
  integer,
  timestamp,
  jsonb,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// Review status
export const reviewStatusEnum = pgEnum("review_status", [
  "pending",
  "processing",
  "completed",
  "failed",
]);

// 1. Users
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  githubId: text("github_id").notNull().unique(),
  username: text("username").notNull(),
  email: text("email"),
  avatarUrl: text("avatar_url"),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// 2. Repositories
export const repositories = pgTable("repositories", {
  id: uuid("id").defaultRandom().primaryKey(),
  githubRepoId: text("github_repo_id").notNull().unique(),
  name: text("name").notNull(),
  fullName: text("full_name").notNull().unique(),
  owner: text("owner").notNull(),
  defaultBranch: text("default_branch").default("main"),
  installationId: text("installation_id"),

  connectedBy: uuid("connected_by")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// 3. Pull Requests
export const pullRequests = pgTable(
  "pull_requests",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    repositoryId: uuid("repository_id")
      .notNull()
      .references(() => repositories.id, { onDelete: "cascade" }),

    githubPrNumber: integer("github_pr_number").notNull(),
    title: text("title").notNull(),
    body: text("body"),
    authorLogin: text("author_login"),
    headSha: text("head_sha"),
    baseSha: text("base_sha"),
    state: text("state").default("open"),
    htmlUrl: text("html_url"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("repository_pr_unique").on(
      table.repositoryId,
      table.githubPrNumber
    ),
  ]
);

// 4. Reviews
export const reviews = pgTable("reviews", {
  id: uuid("id").defaultRandom().primaryKey(),

  pullRequestId: uuid("pull_request_id")
    .notNull()
    .references(() => pullRequests.id, { onDelete: "cascade" }),

  status: reviewStatusEnum("status").default("pending").notNull(),
  summary: text("summary"),
  findings: jsonb("findings"),
  model: text("model"),
  error: text("error"),

  startedAt: timestamp("started_at", { withTimezone: true }),
  completedAt: timestamp("completed_at", { withTimezone: true }),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
