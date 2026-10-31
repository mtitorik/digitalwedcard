"use server";

import { revalidatePath } from "next/cache";
import db from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { rsvpSchema, RSVPFormValues } from "@/lib/validators/rsvp.schema";
import { ActionResult } from "@/types";
import { AttendanceStatus } from "@prisma/client";

export async function submitRSVP(
  input: RSVPFormValues
): Promise<ActionResult<{ id: string; attendance: AttendanceStatus }>> {
  try {
    const validated = rsvpSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        error: "Validation failed. Please verify your RSVP details.",
        fieldErrors: validated.error.flatten().fieldErrors,
      };
    }

    const { invitationId, guestName, guestEmail, guestPhone, attendance, additionalGuestsCount, message } =
      validated.data;

    const invitation = await db.invitation.findUnique({
      where: { id: invitationId },
      select: { id: true, slug: true, status: true },
    });

    if (!invitation) {
      return {
        success: false,
        error: "Invitation not found.",
      };
    }

    const rsvp = await db.rsvpResponse.create({
      data: {
        invitationId,
        guestName,
        guestEmail: guestEmail || null,
        guestPhone: guestPhone || null,
        attendance: attendance as AttendanceStatus,
        additionalGuestsCount,
        message: message || null,
      },
    });

    revalidatePath(`/i/${invitation.slug}`);
    revalidatePath(`/admin/invitations/${invitation.id}`);
    revalidatePath("/admin");

    return {
      success: true,
      data: { id: rsvp.id, attendance: rsvp.attendance },
      message:
        rsvp.attendance === "ATTENDING"
          ? "Thank you! Your RSVP has been confirmed. We can't wait to celebrate together!"
          : rsvp.attendance === "DECLINED"
          ? "Thank you for letting us know. You will be missed!"
          : "Thank you! We've noted your tentative RSVP. Please let us know once your plans are finalized.",
    };
  } catch (error) {
    console.error("Submit RSVP error:", error);
    return {
      success: false,
      error: "Failed to submit your RSVP. Please try again.",
    };
  }
}

export async function getRSVPsForInvitation(invitationId: string) {
  await requireAdmin();

  return db.rsvpResponse.findMany({
    where: { invitationId },
    orderBy: { createdAt: "desc" },
  });
}

export async function deleteRSVP(
  id: string
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireAdmin();

    const rsvp = await db.rsvpResponse.delete({
      where: { id },
      include: { invitation: { select: { id: true, slug: true } } },
    });

    if (rsvp.invitation) {
      revalidatePath(`/admin/invitations/${rsvp.invitation.id}`);
      revalidatePath(`/i/${rsvp.invitation.slug}`);
    }

    return {
      success: true,
      data: { id },
      message: "RSVP record removed.",
    };
  } catch (error) {
    console.error("Delete RSVP error:", error);
    return {
      success: false,
      error: "Failed to delete RSVP record.",
    };
  }
}

