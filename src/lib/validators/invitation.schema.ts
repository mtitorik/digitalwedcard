import { z } from "zod";

export const eventScheduleSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(2, "Event title is required"),
  date: z.string().min(1, "Event date is required"),
  startTime: z.string().min(1, "Start time is required (e.g. '4:00 PM')"),
  endTime: z.string().optional().nullable(),
  venueName: z.string().trim().min(2, "Venue name is required"),
  address: z.string().trim().min(2, "Venue address is required"),
  googleMapsUrl: z.string().url("Valid Google Maps URL required"),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  order: z.number(),
});

export type EventScheduleFormValues = z.infer<typeof eventScheduleSchema>;

export const invitationSchema = z.object({
  templateId: z.string().min(1, "Please select a design template"),
  slug: z
    .string()
    .trim()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  isPasswordProtected: z.boolean(),
  passcode: z.string().optional().nullable(),
  groomName: z.string().trim().min(1, "Groom's name is required"),
  brideName: z.string().trim().min(1, "Bride's name is required"),
  coupleStory: z.string().optional().nullable(),
  coverImageUrl: z.string().url("Please provide a valid cover photo URL"),
  galleryImages: z.array(z.string().url("Valid image URL required")),
  backgroundMusicUrl: z.string().url("Valid audio URL required").optional().nullable().or(z.literal("")),
  fontFamily: z.string(),
  primaryColor: z.string(),
  accentColor: z.string(),
  schedules: z.array(eventScheduleSchema),
});

export type InvitationFormValues = z.infer<typeof invitationSchema>;
