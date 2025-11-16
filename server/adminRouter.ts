import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import {
  getAllImages,
  getImagesByCategory,
  createImage,
  updateImage,
  deleteImage,
  getImageById,
  getAllServices,
  getServiceByKey,
  createService,
  updateService,
} from "./imageDb";
import { storagePut, storageGet } from "./storage";

// Admin-only procedure
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

export const adminRouter = router({
  /**
   * Image management procedures
   */
  images: router({
    // Get all images
    list: adminProcedure.query(async () => {
      return getAllImages();
    }),

    // Get images by category
    byCategory: adminProcedure
      .input(z.object({ category: z.string() }))
      .query(async ({ input }) => {
        return getImagesByCategory(input.category);
      }),

    // Get single image
    get: adminProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getImageById(input.id);
      }),

    // Upload image
    upload: adminProcedure
      .input(
        z.object({
          title: z.string(),
          description: z.string().optional(),
          category: z.string(),
          base64Data: z.string(), // Base64 encoded image data
          fileName: z.string(),
          mimeType: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          // Convert base64 to buffer
          const buffer = Buffer.from(input.base64Data, "base64");

          // Generate unique file key
          const timestamp = Date.now();
          const fileKey = `images/${input.category}/${timestamp}-${input.fileName}`;

          // Upload to S3
          const { url } = await storagePut(fileKey, buffer, input.mimeType);

          // Save metadata to database
          const result = await createImage({
            title: input.title,
            description: input.description,
            category: input.category as any,
            url,
            source: "local",
            mimeType: input.mimeType,
            fileSize: buffer.length,
          });

          return {
            success: true,
            url,
            message: "Image uploaded successfully",
          };
        } catch (error) {
          console.error("Image upload error:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to upload image",
          });
        }
      }),

    // Update image metadata
    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().optional(),
          description: z.string().optional(),
          displayOrder: z.number().optional(),
          isActive: z.number().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateImage(id, data);
        return { success: true, message: "Image updated successfully" };
      }),

    // Delete image
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteImage(input.id);
        return { success: true, message: "Image deleted successfully" };
      }),

    // Add Google Drive image
    addGoogleDrive: adminProcedure
      .input(
        z.object({
          title: z.string(),
          description: z.string().optional(),
          category: z.string(),
          googleDriveFileId: z.string(),
          googleDriveUrl: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        const result = await createImage({
          title: input.title,
          description: input.description,
          category: input.category as any,
          url: input.googleDriveUrl,
          source: "google_drive",
          googleDriveFileId: input.googleDriveFileId,
        });

        return {
          success: true,
          message: "Google Drive image added successfully",
        };
      }),
  }),

  /**
   * Service management procedures
   */
  services: router({
    // Get all services
    list: adminProcedure.query(async () => {
      return getAllServices();
    }),

    // Get service by key
    get: adminProcedure
      .input(z.object({ key: z.string() }))
      .query(async ({ input }) => {
        return getServiceByKey(input.key);
      }),

    // Update service
    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          titleEn: z.string().optional(),
          titleZh: z.string().optional(),
          descriptionEn: z.string().optional(),
          descriptionZh: z.string().optional(),
          featuredImageId: z.number().optional(),
          displayOrder: z.number().optional(),
          isActive: z.number().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateService(id, data);
        return { success: true, message: "Service updated successfully" };
      }),
  }),
});
