import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Name schema
export const names = pgTable("names", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'firstName', 'lastName'
  gender: text("gender"), // 'male', 'female', 'neutral'
  ethnicity: text("ethnicity"), // 'yoruba', 'igbo', 'delta'
  meaning: text("meaning"),
});

export const insertNameSchema = createInsertSchema(names).pick({
  name: true,
  type: true,
  gender: true,
  ethnicity: true,
  meaning: true,
});

// Title schema
export const titles = pgTable("titles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  gender: text("gender"), // 'male', 'female', 'neutral'
  ethnicity: text("ethnicity"), // 'yoruba', 'igbo', 'delta'
});

export const insertTitleSchema = createInsertSchema(titles).pick({
  title: true,
  gender: true,
  ethnicity: true,
});

// User schema (kept from original file)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Type exports
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertName = z.infer<typeof insertNameSchema>;
export type Name = typeof names.$inferSelect;

export type InsertTitle = z.infer<typeof insertTitleSchema>;
export type Title = typeof titles.$inferSelect;

// Request schema for name generation
export const generateNameRequestSchema = z.object({
  ethnicity: z.enum(['yoruba', 'igbo', 'delta', 'any']).optional(),
  gender: z.enum(['male', 'female', 'any']).optional(),
  personalName: z.string().optional(),
  isPremium: z.boolean().optional(),
});

export type GenerateNameRequest = z.infer<typeof generateNameRequestSchema>;

// Response schema for generated name
export const generatedNameSchema = z.object({
  fullName: z.string(),
  title: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  meaning: z.string().optional(),
  ethnicity: z.string().optional(),
});

export type GeneratedName = z.infer<typeof generatedNameSchema>;
