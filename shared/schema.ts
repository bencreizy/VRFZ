import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  walletAddress: text("wallet_address"),
  balance: text("balance").default("0"),
  verificationCount: integer("verification_count").default(0),
  lastActivity: timestamp("last_activity"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const presaleSubmissions = pgTable("presale_submissions", {
  id: serial("id").primaryKey(),
  walletAddress: text("wallet_address").notNull(),
  amount: text("amount").notNull(),
  tokenAmount: text("token_amount").notNull(),
  status: text("status").notNull().default("pending"), // pending, confirmed, failed
  txHash: text("tx_hash"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const verifications = pgTable("verifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  location: text("location").notNull(),
  method: text("method").notNull(), // fingerprint, qr, nfc
  reward: text("reward").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  verificationMethod: text("verification_method").default("fingerprint"),
  autoCheckin: boolean("auto_checkin").default(false),
  rewardNotifications: boolean("reward_notifications").default(true),
  locationReminders: boolean("location_reminders").default(false),
  weeklySummary: boolean("weekly_summary").default(true),
  anonymousMode: boolean("anonymous_mode").default(false),
  dataSharing: boolean("data_sharing").default(true),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertPresaleSubmissionSchema = createInsertSchema(presaleSubmissions).omit({
  id: true,
  createdAt: true,
  status: true,
  txHash: true,
});

export const insertVerificationSchema = createInsertSchema(verifications).omit({
  id: true,
  createdAt: true,
});

export const insertSettingsSchema = createInsertSchema(settings).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertPresaleSubmission = z.infer<typeof insertPresaleSubmissionSchema>;
export type PresaleSubmission = typeof presaleSubmissions.$inferSelect;
export type InsertVerification = z.infer<typeof insertVerificationSchema>;
export type Verification = typeof verifications.$inferSelect;
export type InsertSettings = z.infer<typeof insertSettingsSchema>;
export type Settings = typeof settings.$inferSelect;
