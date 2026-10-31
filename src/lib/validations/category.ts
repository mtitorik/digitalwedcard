import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().trim().min(2, "Category name must be at least 2 characters"),
  slug: z
    .string()
    .trim()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  description: z.string().trim().optional().nullable(),
  parentId: z.string().optional().nullable().or(z.literal("")),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
