"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import db from "@/lib/db";
import { createSession, destroySession, getSession } from "@/lib/auth";
import { loginSchema, registerSchema, LoginInput, RegisterInput } from "@/lib/validators/auth.schema";
import { ActionResult, SessionUser } from "@/types";

export async function loginAction(input: LoginInput): Promise<ActionResult<SessionUser>> {
  try {
    const validated = loginSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: validated.error.flatten().fieldErrors,
      };
    }

    const { email, password } = validated.data;
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user || !user.passwordHash) {
      return {
        success: false,
        error: "Invalid email or password combination.",
      };
    }

    const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordsMatch) {
      return {
        success: false,
        error: "Invalid email or password combination.",
      };
    }

    const sessionUser: SessionUser = {
      id: user.id,
      email: user.email,
      name: user.name || "Studio User",
      role: user.role,
    };

    await createSession(sessionUser);
    revalidatePath("/", "layout");

    return {
      success: true,
      data: sessionUser,
      message: `Welcome back, ${sessionUser.name}!`,
    };
  } catch (error) {
    console.error("Login action error:", error);
    return {
      success: false,
      error: "An unexpected error occurred during login. Please try again.",
    };
  }
}

export async function registerAction(input: RegisterInput): Promise<ActionResult<SessionUser>> {
  try {
    const validated = registerSchema.safeParse(input);
    if (!validated.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: validated.error.flatten().fieldErrors,
      };
    }

    const { name, email, password } = validated.data;
    const existingUser = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return {
        success: false,
        error: "An account with this email address already exists.",
        fieldErrors: { email: ["This email is already registered"] },
      };
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await db.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        passwordHash,
        role: Role.USER,
      },
    });

    const sessionUser: SessionUser = {
      id: user.id,
      email: user.email,
      name: user.name || name,
      role: user.role,
    };

    await createSession(sessionUser);
    revalidatePath("/", "layout");

    return {
      success: true,
      data: sessionUser,
      message: "Account created successfully!",
    };
  } catch (error) {
    console.error("Register action error:", error);
    return {
      success: false,
      error: "An unexpected error occurred during registration. Please try again.",
    };
  }
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  revalidatePath("/", "layout");
  redirect("/");
}

export async function getCurrentUserAction(): Promise<SessionUser | null> {
  return getSession();
}

