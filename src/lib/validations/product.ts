import { z } from "zod";

export const variantSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1, "Option name is required"),
  priceModifier: z.number(),
});

export const productSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),
  slug: z
    .string()
    .trim()
    .min(3, "Slug must be at least 3 characters")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  description: z.string().trim().min(10, "Description must be at least 10 characters"),
  sku: z.string().trim().min(2, "SKU must be at least 2 characters"),
  basePrice: z.number().positive("Base price must be greater than 0"),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  isCustomizable: z.boolean(),
  sampleImageUrl: z.string().url("Must be a valid URL").optional().nullable().or(z.literal("")),
  printOrientation: z.enum(["PORTRAIT", "LANDSCAPE", "SQUARE"]),
  categoryId: z.string().min(1, "Please select a category"),
  variants: z.array(variantSchema),
});

export type ProductFormValues = z.infer<typeof productSchema>;
export type VariantFormValue = z.infer<typeof variantSchema>;
