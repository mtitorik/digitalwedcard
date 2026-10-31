import { z } from "zod";

export const templateSchema = z.object({
  name: z.string().trim().min(2, "Template name must be at least 2 characters"),
  slug: z
    .string()
    .trim()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  thumbnailUrl: z.string().url("Please enter a valid thumbnail image URL"),
  description: z.string().trim().min(10, "Description must be at least 10 characters"),
  price: z.number().min(0, "Price cannot be negative"),
  isPremium: z.boolean(),
  isActive: z.boolean(),
  defaultConfig: z.object({
    fontFamily: z.string(),
    primaryColor: z.string(),
    accentColor: z.string(),
    preset: z.string().optional(),
  }),
});

export type TemplateFormValues = z.infer<typeof templateSchema>;
