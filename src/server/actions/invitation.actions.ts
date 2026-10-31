"use server";

import { revalidatePath } from "next/cache";
import db from "@/lib/db";
import { requireAdmin, getSession } from "@/lib/auth";
import { invitationSchema, InvitationFormValues } from "@/lib/validators/invitation.schema";
import { ActionResult } from "@/types";
import { InvitationStatus, Prisma } from "@prisma/client";

export async function getInvitationsAdmin(filters?: {
  search?: string;
  status?: string;
  templateId?: string;
}) {
  await requireAdmin();

  const where: Prisma.InvitationWhereInput = {};

  if (filters?.search) {
    where.OR = [
      { slug: { contains: filters.search, mode: "insensitive" } },
      { groomName: { contains: filters.search, mode: "insensitive" } },
      { brideName: { contains: filters.search, mode: "insensitive" } },
      { user: { name: { contains: filters.search, mode: "insensitive" } } },
      { user: { email: { contains: filters.search, mode: "insensitive" } } },
    ];
  }

  if (filters?.status && filters.status !== "ALL") {
    where.status = filters.status as InvitationStatus;
  }

  if (filters?.templateId && filters.templateId !== "ALL") {
    where.templateId = filters.templateId;
  }

  return db.invitation.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      template: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      _count: {
        select: {
          rsvps: true,
          schedules: true,
        },
      },
    },
  });
}

export async function getInvitationByIdAdmin(id: string) {
  await requireAdmin();

  return db.invitation.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      template: true,
      schedules: {
        orderBy: { order: "asc" },
      },
      rsvps: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export async function getInvitationBySlug(slug: string) {
  return db.invitation.findUnique({
    where: { slug },
    include: {
      template: true,
      schedules: {
        orderBy: { order: "asc" },
      },
      _count: {
        select: { rsvps: true },
      },
    },
  });
}

export async function incrementInvitationViews(slug: string): Promise<void> {
  try {
    await db.invitation.update({
      where: { slug },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });
  } catch (err) {
    console.error("Failed to increment invitation view count:", err);
  }
}

export async function verifyInvitationPasscode(
  slug: string,
  passcode: string
): Promise<ActionResult<{ verified: boolean }>> {
  const invitation = await db.invitation.findUnique({
    where: { slug },
    select: { isPasswordProtected: true, passcode: true },
  });

  if (!invitation) {
    return { success: false, error: "Invitation not found." };
  }

  if (!invitation.isPasswordProtected) {
    return { success: true, data: { verified: true } };
  }

  if (invitation.passcode && invitation.passcode.trim() === passcode.trim()) {
    return { success: true, data: { verified: true } };
  }

  return { success: false, error: "Invalid passcode. Please try again." };
}

export async function createInvitation(
  data: InvitationFormValues
): Promise<ActionResult<{ id: string; slug: string }>> {
  try {
    const session = await getSession();
    if (!session) {
      return { success: false, error: "Unauthorized. Please sign in." };
    }

    const validated = invitationSchema.safeParse(data);
    if (!validated.success) {
      return {
        success: false,
        error: "Validation failed.",
        fieldErrors: validated.error.flatten().fieldErrors,
      };
    }

    const values = validated.data;

    const existingSlug = await db.invitation.findUnique({
      where: { slug: values.slug },
    });

    if (existingSlug) {
      return {
        success: false,
        error: "This invitation URL slug is already taken.",
        fieldErrors: { slug: ["Slug must be unique"] },
      };
    }

    const invitation = await db.invitation.create({
      data: {
        userId: session.id,
        templateId: values.templateId,
        slug: values.slug,
        status: values.status,
        isPasswordProtected: values.isPasswordProtected,
        passcode: values.isPasswordProtected ? values.passcode : null,
        groomName: values.groomName,
        brideName: values.brideName,
        coupleStory: values.coupleStory,
        coverImageUrl: values.coverImageUrl,
        galleryImages: values.galleryImages,
        backgroundMusicUrl: values.backgroundMusicUrl || null,
        fontFamily: values.fontFamily,
        primaryColor: values.primaryColor,
        accentColor: values.accentColor,
        schedules: {
          create: values.schedules.map((s, idx) => ({
            title: s.title,
            date: new Date(s.date),
            startTime: s.startTime,
            endTime: s.endTime || null,
            venueName: s.venueName,
            address: s.address,
            googleMapsUrl: s.googleMapsUrl,
            latitude: s.latitude || null,
            longitude: s.longitude || null,
            order: s.order ?? idx,
          })),
        },
      },
    });

    revalidatePath("/admin/invitations");
    revalidatePath("/admin");

    return {
      success: true,
      data: { id: invitation.id, slug: invitation.slug },
      message: "Digital invitation card created successfully!",
    };
  } catch (error) {
    console.error("Create invitation error:", error);
    return {
      success: false,
      error: "Failed to create invitation card.",
    };
  }
}

export async function updateInvitation(
  id: string,
  data: InvitationFormValues
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireAdmin();

    const validated = invitationSchema.safeParse(data);
    if (!validated.success) {
      return {
        success: false,
        error: "Validation failed.",
        fieldErrors: validated.error.flatten().fieldErrors,
      };
    }

    const values = validated.data;

    const existingSlug = await db.invitation.findFirst({
      where: { slug: values.slug, NOT: { id } },
    });

    if (existingSlug) {
      return {
        success: false,
        error: "This invitation slug is already in use.",
        fieldErrors: { slug: ["Slug must be unique"] },
      };
    }

    await db.$transaction(async (tx) => {
      // Re-create event schedules
      await tx.eventSchedule.deleteMany({
        where: { invitationId: id },
      });

      await tx.invitation.update({
        where: { id },
        data: {
          templateId: values.templateId,
          slug: values.slug,
          status: values.status,
          isPasswordProtected: values.isPasswordProtected,
          passcode: values.isPasswordProtected ? values.passcode : null,
          groomName: values.groomName,
          brideName: values.brideName,
          coupleStory: values.coupleStory,
          coverImageUrl: values.coverImageUrl,
          galleryImages: values.galleryImages,
          backgroundMusicUrl: values.backgroundMusicUrl || null,
          fontFamily: values.fontFamily,
          primaryColor: values.primaryColor,
          accentColor: values.accentColor,
          schedules: {
            create: values.schedules.map((s, idx) => ({
              title: s.title,
              date: new Date(s.date),
              startTime: s.startTime,
              endTime: s.endTime || null,
              venueName: s.venueName,
              address: s.address,
              googleMapsUrl: s.googleMapsUrl,
              latitude: s.latitude || null,
              longitude: s.longitude || null,
              order: s.order ?? idx,
            })),
          },
        },
      });
    });

    revalidatePath("/admin/invitations");
    revalidatePath(`/admin/invitations/${id}`);
    revalidatePath(`/i/${values.slug}`);
    revalidatePath("/admin");

    return {
      success: true,
      data: { id },
      message: "Invitation card updated successfully.",
    };
  } catch (error) {
    console.error("Update invitation error:", error);
    return {
      success: false,
      error: "Failed to update invitation card.",
    };
  }
}

export async function toggleInvitationStatus(
  id: string,
  newStatus: InvitationStatus
): Promise<ActionResult<{ id: string; status: InvitationStatus }>> {
  try {
    await requireAdmin();

    const updated = await db.invitation.update({
      where: { id },
      data: { status: newStatus },
    });

    revalidatePath("/admin/invitations");
    revalidatePath(`/admin/invitations/${id}`);
    revalidatePath("/admin");

    return {
      success: true,
      data: { id: updated.id, status: updated.status },
      message: `Invitation status updated to ${newStatus}.`,
    };
  } catch (error) {
    console.error("Toggle invitation status error:", error);
    return {
      success: false,
      error: "Failed to update invitation status.",
    };
  }
}

export async function deleteInvitation(
  id: string
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireAdmin();

    await db.invitation.delete({
      where: { id },
    });

    revalidatePath("/admin/invitations");
    revalidatePath("/admin");

    return {
      success: true,
      data: { id },
      message: "Digital invitation card deleted successfully.",
    };
  } catch (error) {
    console.error("Delete invitation error:", error);
    return {
      success: false,
      error: "Failed to delete invitation card.",
    };
  }
}

