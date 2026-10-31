"use server";

import { revalidatePath } from "next/cache";
import db from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { templateSchema, TemplateFormValues } from "@/lib/validators/template.schema";
import { ActionResult } from "@/types";
import { Prisma } from "@prisma/client";

export async function getTemplates(options?: { onlyActive?: boolean }) {
  const where: Prisma.TemplateWhereInput = {};
  if (options?.onlyActive !== false) {
    where.isActive = true;
  }

  return db.template.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { invitations: true },
      },
    },
  });
}

export async function getTemplatesAdmin(filters?: {
  search?: string;
  isPremium?: boolean;
  isActive?: boolean;
}) {
  await requireAdmin();

  const where: Prisma.TemplateWhereInput = {};

  if (filters?.search) {
    where.OR = [
      { name: { contains: filters.search, mode: "insensitive" } },
      { slug: { contains: filters.search, mode: "insensitive" } },
      { description: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  if (typeof filters?.isPremium === "boolean") {
    where.isPremium = filters.isPremium;
  }

  if (typeof filters?.isActive === "boolean") {
    where.isActive = filters.isActive;
  }

  return db.template.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { invitations: true },
      },
    },
  });
}

export async function getTemplateById(id: string) {
  return db.template.findUnique({
    where: { id },
    include: {
      _count: {
        select: { invitations: true },
      },
    },
  });
}

export async function createTemplate(
  data: TemplateFormValues
): Promise<ActionResult<{ id: string; slug: string }>> {
  try {
    await requireAdmin();

    const validated = templateSchema.safeParse(data);
    if (!validated.success) {
      return {
        success: false,
        error: "Validation failed. Please check the form fields.",
        fieldErrors: validated.error.flatten().fieldErrors,
      };
    }

    const { name, slug, thumbnailUrl, description, price, isPremium, isActive, defaultConfig } =
      validated.data;

    const existingSlug = await db.template.findUnique({
      where: { slug },
    });

    if (existingSlug) {
      return {
        success: false,
        error: "A template with this slug already exists.",
        fieldErrors: { slug: ["Slug must be unique"] },
      };
    }

    const template = await db.template.create({
      data: {
        name,
        slug,
        thumbnailUrl,
        description,
        price,
        isPremium,
        isActive,
        defaultConfig: defaultConfig as Prisma.InputJsonValue,
      },
    });

    revalidatePath("/admin/templates");
    revalidatePath("/admin");

    return {
      success: true,
      data: { id: template.id, slug: template.slug },
      message: `Template "${template.name}" created successfully.`,
    };
  } catch (error) {
    console.error("Create template error:", error);
    return {
      success: false,
      error: "Failed to create template. Please try again.",
    };
  }
}

export async function updateTemplate(
  id: string,
  data: TemplateFormValues
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireAdmin();

    const validated = templateSchema.safeParse(data);
    if (!validated.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: validated.error.flatten().fieldErrors,
      };
    }

    const { name, slug, thumbnailUrl, description, price, isPremium, isActive, defaultConfig } =
      validated.data;

    const existingSlug = await db.template.findFirst({
      where: { slug, NOT: { id } },
    });

    if (existingSlug) {
      return {
        success: false,
        error: "A template with this slug already exists.",
        fieldErrors: { slug: ["Slug must be unique"] },
      };
    }

    await db.template.update({
      where: { id },
      data: {
        name,
        slug,
        thumbnailUrl,
        description,
        price,
        isPremium,
        isActive,
        defaultConfig: defaultConfig as Prisma.InputJsonValue,
      },
    });

    revalidatePath("/admin/templates");
    revalidatePath(`/admin/templates/${id}`);
    revalidatePath("/admin");

    return {
      success: true,
      data: { id },
      message: `Template updated successfully.`,
    };
  } catch (error) {
    console.error("Update template error:", error);
    return {
      success: false,
      error: "Failed to update template.",
    };
  }
}

export async function toggleTemplateStatus(
  id: string,
  isActive: boolean
): Promise<ActionResult<{ id: string; isActive: boolean }>> {
  try {
    await requireAdmin();

    const updated = await db.template.update({
      where: { id },
      data: { isActive },
    });

    revalidatePath("/admin/templates");

    return {
      success: true,
      data: { id: updated.id, isActive: updated.isActive },
      message: `Template status changed to ${isActive ? "Active" : "Inactive"}.`,
    };
  } catch (error) {
    console.error("Toggle template status error:", error);
    return {
      success: false,
      error: "Failed to update template status.",
    };
  }
}

export async function deleteTemplate(
  id: string
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireAdmin();

    const inUseCount = await db.invitation.count({
      where: { templateId: id },
    });

    if (inUseCount > 0) {
      return {
        success: false,
        error: `Cannot delete template: it is used by ${inUseCount} digital invitation(s). Deactivate it instead.`,
      };
    }

    await db.template.delete({
      where: { id },
    });

    revalidatePath("/admin/templates");
    revalidatePath("/admin");

    return {
      success: true,
      data: { id },
      message: "Template deleted successfully.",
    };
  } catch (error) {
    console.error("Delete template error:", error);
    return {
      success: false,
      error: "Failed to delete template.",
    };
  }
}

