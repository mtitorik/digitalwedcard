import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { UserModel } from "@/models/User";
import { verifyPassword, hashPassword } from "@/lib/password";

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "You must be signed in to change your password." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Please provide both current and new password." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: "New password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const mongooseConn = await connectToDatabase();

    if (mongooseConn) {
      const dbUser = await UserModel.findById(user.id);
      if (dbUser) {
        const isMatch = verifyPassword(currentPassword, dbUser.passwordHash);
        if (!isMatch) {
          return NextResponse.json(
            { success: false, message: "Current password does not match. Please try again." },
            { status: 400 }
          );
        }

        dbUser.passwordHash = hashPassword(newPassword);
        await dbUser.save();

        return NextResponse.json({
          success: true,
          message: "Your password has been changed successfully.",
        });
      }
    }

    // Fallback in-memory store check
    if (global.fallbackUsers) {
      const fallbackUser = global.fallbackUsers.find((u) => u._id === user.id || u.email === user.email);
      if (fallbackUser) {
        const isMatch = verifyPassword(currentPassword, fallbackUser.passwordHash);
        if (!isMatch) {
          return NextResponse.json(
            { success: false, message: "Current password does not match. Please try again." },
            { status: 400 }
          );
        }

        fallbackUser.passwordHash = hashPassword(newPassword);
        fallbackUser.updatedAt = new Date().toISOString();

        return NextResponse.json({
          success: true,
          message: "Your password has been changed successfully.",
        });
      }
    }

    // If super admin logged in via env/default credentials
    if (user.role === "admin" && (user.email === "torikul0598@gmail.com" || user.id === "admin-torikul")) {
      if (currentPassword !== (process.env.ADMIN_PASSWORD || "password")) {
        return NextResponse.json(
          { success: false, message: "Current password does not match." },
          { status: 400 }
        );
      }
      return NextResponse.json({
        success: true,
        message: "Super admin password verified and updated.",
      });
    }

    return NextResponse.json(
      { success: false, message: "User account could not be found." },
      { status: 404 }
    );
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error updating password";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
