import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { UserModel } from "@/models/User";
import { verifyPassword } from "@/lib/password";
import { signUserToken, COOKIE_NAME, LEGACY_ADMIN_COOKIE } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Please provide both email and password." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const envAdminEmail = (process.env.ADMIN_EMAIL || "torikul0598@gmail.com").toLowerCase();
    const envAdminPassword = process.env.ADMIN_PASSWORD || "password";

    const isTorikulAdmin = cleanEmail === "torikul0598@gmail.com" && password === "password";
    const isEnvAdmin = cleanEmail === envAdminEmail && password === envAdminPassword;
    const isLegacyAdmin = cleanEmail === "admin@wedding.com" && password === "admin123";

    // 1. Check Super Admin Credentials
    if (isTorikulAdmin || isEnvAdmin || isLegacyAdmin) {
      const adminUser = {
        id: "admin-torikul",
        email: cleanEmail,
        name: isTorikulAdmin ? "Torikul Islam (Super Admin)" : "Master Administrator",
        role: "admin" as const,
      };

      const token = await signUserToken(adminUser);

      const response = NextResponse.json({
        success: true,
        message: "Admin login successful.",
        user: adminUser,
        redirectTo: "/admin",
      });

      // Set cookie
      response.cookies.set({
        name: COOKIE_NAME,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      // Also set legacy admin cookie for backwards compatibility
      response.cookies.set({
        name: LEGACY_ADMIN_COOKIE,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      return response;
    }

    // 2. Check MongoDB / Fallback Users
    const mongooseConn = await connectToDatabase();
    let foundUser: { id: string; name: string; email: string; passwordHash: string; role: "user" | "admin" } | null = null;

    if (mongooseConn) {
      const dbUser = await UserModel.findOne({ email: cleanEmail });
      if (dbUser) {
        foundUser = {
          id: dbUser._id.toString(),
          name: dbUser.name,
          email: dbUser.email,
          passwordHash: dbUser.passwordHash,
          role: dbUser.role || "user",
        };
      }
    } else {
      const fallbackUser = (global.fallbackUsers || []).find((u) => u.email === cleanEmail);
      if (fallbackUser) {
        foundUser = {
          id: fallbackUser._id,
          name: fallbackUser.name,
          email: fallbackUser.email,
          passwordHash: fallbackUser.passwordHash,
          role: fallbackUser.role || "user",
        };
      }
    }

    if (!foundUser) {
      return NextResponse.json(
        { success: false, message: "Invalid email address or password. Please try again." },
        { status: 401 }
      );
    }

    const isMatch = verifyPassword(password, foundUser.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid email address or password. Please try again." },
        { status: 401 }
      );
    }

    const authPayload = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
    };

    const token = await signUserToken(authPayload);

    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
      user: authPayload,
      redirectTo: foundUser.role === "admin" ? "/admin" : "/dashboard",
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    if (foundUser.role === "admin") {
      response.cookies.set({
        name: LEGACY_ADMIN_COOKIE,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
    }

    return response;
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
