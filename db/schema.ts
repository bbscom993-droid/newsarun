import { pgTable, text, jsonb, timestamp, integer } from "drizzle-orm/pg-core";

// Each portal entity is stored as a JSON document matching the frontend types in src/data/newsData.ts.
export const articles = pgTable("articles", {
  id: text().primaryKey(),
  data: jsonb().notNull(),
  position: integer().notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const adSlots = pgTable("ad_slots", {
  id: text().primaryKey(),
  data: jsonb().notNull(),
  position: integer().notNull().default(0),
});

export const citizenReports = pgTable("citizen_reports", {
  id: text().primaryKey(),
  data: jsonb().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const coffeeTips = pgTable("coffee_tips", {
  id: text().primaryKey(),
  data: jsonb().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const settings = pgTable("settings", {
  key: text().primaryKey(),
  value: jsonb().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
