import { eq, desc } from "drizzle-orm";
import { images, services, Image, InsertImage, Service, InsertService } from "../drizzle/schema";
import { getDb } from "./db";

/**
 * Image database operations
 */

export async function getAllImages() {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(images).where(eq(images.isActive, 1)).orderBy(desc(images.createdAt));
}

export async function getImagesByCategory(category: string) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select()
    .from(images)
    .where(eq(images.category, category as any))
    .orderBy(images.displayOrder);
}

export async function createImage(data: InsertImage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(images).values(data);
  return result;
}

export async function updateImage(id: number, data: Partial<InsertImage>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.update(images).set(data).where(eq(images.id, id));
}

export async function deleteImage(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.delete(images).where(eq(images.id, id));
}

export async function getImageById(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(images).where(eq(images.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

/**
 * Service database operations
 */

export async function getAllServices() {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(services).where(eq(services.isActive, 1)).orderBy(services.displayOrder);
}

export async function getServiceByKey(key: string) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(services).where(eq(services.key, key)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function createService(data: InsertService) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.insert(services).values(data);
}

export async function updateService(id: number, data: Partial<InsertService>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.update(services).set(data).where(eq(services.id, id));
}
