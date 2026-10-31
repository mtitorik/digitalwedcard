import { z } from "zod";

export const rsvpSchema = z.object({
  invitationId: z.string().min(1, "Invitation ID is required"),
  guestName: z.string().trim().min(2, "Please enter your name"),
  guestEmail: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  guestPhone: z.string().trim().optional().or(z.literal("")),
  attendance: z.enum(["ATTENDING", "DECLINED", "TENTATIVE"]),
  additionalGuestsCount: z
    .number()
    .int("Must be an integer")
    .min(0, "Cannot be negative")
    .max(10, "Maximum 10 additional guests"),
  message: z.string().trim().optional().or(z.literal("")),
});

export type RSVPFormValues = z.infer<typeof rsvpSchema>;
