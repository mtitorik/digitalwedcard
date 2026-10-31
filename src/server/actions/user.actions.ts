"use server";

import { revalidatePath } from "next/cache";
import db from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { Role } from "@prisma/client";
import { ActionResult } from "@/types";

export async function getUsersAdmin() {
  await requireAdmin();

  return db.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          invitations: true,
        },
      },
    },
  });
}

export async function toggleUserRole(
  userId: string,
  newRole: Role
): Promise<ActionResult<{ id: string; role: Role }>> {
  try {
    const admin = await requireAdmin();

    if (admin.id === userId && newRole !== Role.ADMIN) {
      return {
        success: false,
        error: "You cannot demote yourself from Administrator status.",
      };
    }

    const updated = await db.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    revalidatePath("/admin/users");

    return {
      success: true,
      data: { id: updated.id, role: updated.role },
      message: `User role updated to ${newRole}.`,
    };
  } catch (error) {
    console.error("Toggle user role error:", error);
    return {
      success: false,
      error: "Failed to update user role.",
    };
  }
}

