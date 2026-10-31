import { z } from "zod";

export const assetSchema = z.object({
  fileName: z.string().trim().min(1, "File name is required"),
  fileUrl: z.string().url("Must be a valid URL"),
  fileType: z.string().min(1, "File type is required"),
  fileSize: z.number().int().min(1, "File size must be greater than 0"),
  title: z.string().trim().optional().nullable(),
  altText: z.string().trim().optional().nullable(),
});

export type AssetFormValues = z.infer<typeof assetSchema>;
