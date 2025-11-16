import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Image management table for storing photo metadata
 * Supports local uploads and Google Drive references
 */
export const images = mysqlTable("images", {
  id: int("id").autoincrement().primaryKey(),
  /** Image title/name */
  title: varchar("title", { length: 255 }).notNull(),
  /** Image description */
  description: text("description"),
  /** Service category: interlocking, powerwashing, relevelling, polymer_sand, paver_sealing, yard_works */
  category: mysqlEnum("category", [
    "interlocking",
    "powerwashing",
    "relevelling",
    "polymer_sand",
    "paver_sealing",
    "yard_works",
    "about",
    "hero",
    "other"
  ]).notNull(),
  /** Image URL (S3, Google Drive, or external) */
  url: varchar("url", { length: 1024 }).notNull(),
  /** Image source: local, google_drive, external */
  source: mysqlEnum("source", ["local", "google_drive", "external"]).default("local").notNull(),
  /** Google Drive file ID if source is google_drive */
  googleDriveFileId: varchar("googleDriveFileId", { length: 255 }),
  /** Display order for sorting */
  displayOrder: int("displayOrder").default(0).notNull(),
  /** Whether this image is active/visible */
  isActive: int("isActive").default(1).notNull(),
  /** Image dimensions for optimization */
  width: int("width"),
  height: int("height"),
  /** File size in bytes */
  fileSize: int("fileSize"),
  /** MIME type */
  mimeType: varchar("mimeType", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Image = typeof images.$inferSelect;
export type InsertImage = typeof images.$inferInsert;

/**
 * Service content table for storing service descriptions and metadata
 */
export const services = mysqlTable("services", {
  id: int("id").autoincrement().primaryKey(),
  /** Service key: interlocking, powerwashing, etc. */
  key: varchar("key", { length: 100 }).notNull().unique(),
  /** Service title in English */
  titleEn: varchar("titleEn", { length: 255 }).notNull(),
  /** Service title in Chinese */
  titleZh: varchar("titleZh", { length: 255 }).notNull(),
  /** Service description in English */
  descriptionEn: text("descriptionEn"),
  /** Service description in Chinese */
  descriptionZh: text("descriptionZh"),
  /** Featured image ID for this service */
  featuredImageId: int("featuredImageId"),
  /** Display order */
  displayOrder: int("displayOrder").default(0).notNull(),
  /** Whether this service is active */
  isActive: int("isActive").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Service = typeof services.$inferSelect;
export type InsertService = typeof services.$inferInsert;