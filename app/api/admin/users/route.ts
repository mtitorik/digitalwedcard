import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { UserModel, FallbackUser } from "@/models/User";
import { WeddingCardModel } from "@/models/WeddingCard";
import { hashPassword } from "@/lib/password";

export async function GET(req: NextRequest) {
  const isAuth = await isAuthenticatedAdmin(req);
  if (!isAuth) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const mongooseConn = await connectToDatabase();

    if (mongooseConn) {
      const users = await UserModel.find().sort({ createdAt: -1 }).select("-passwordHash");
      return NextResponse.json({ success: true, users });
    } else {
      const users: Omit<FallbackUser, "passwordHash">[] = (global.fallbackUsers || []).map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ passwordHash, ...rest }) => rest
      );
      return NextResponse.json({ success: true, users });
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error loading users";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const isAuth = await isAuthenticatedAdmin(req);
  if (!isAuth) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, name, email, role, newPassword } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: "Missing User ID" }, { status: 400 });
    }

    const mongooseConn = await connectToDatabase();

    if (mongooseConn) {
      const user = await UserModel.findById(id);
      if (!user) {
        return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
      }

      if (name) user.name = name.trim();
      if (email) user.email = email.trim().toLowerCase();
      if (role && ["user", "admin"].includes(role)) user.role = role;
      if (newPassword && newPassword.length >= 6) {
        user.passwordHash = hashPassword(newPassword);
      }

      await user.save();

      return NextResponse.json({
        success: true,
        message: "User information updated successfully.",
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } else {
      if (!global.fallbackUsers) global.fallbackUsers = [];
      const user = global.fallbackUsers.find((u) => u._id === id);
      if (!user) {
        return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
      }

      if (name) user.name = name.trim();
      if (email) user.email = email.trim().toLowerCase();
      if (role && ["user", "admin"].includes(role)) user.role = role;
      if (newPassword && newPassword.length >= 6) {
        user.passwordHash = hashPassword(newPassword);
      }
      user.updatedAt = new Date().toISOString();

      return NextResponse.json({
        success: true,
        message: "User information updated successfully (in-memory).",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error updating user";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const isAuth = await isAuthenticatedAdmin(req);
  if (!isAuth) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "Missing User ID" }, { status: 400 });
    }

    const mongooseConn = await connectToDatabase();

    if (mongooseConn) {
      await UserModel.findByIdAndDelete(id);
      // Clean up user's created cards
      await WeddingCardModel.deleteMany({ userId: id });
    } else {
      if (global.fallbackUsers) {
        global.fallbackUsers = global.fallbackUsers.filter((u) => u._id !== id);
      }
      if (global.fallbackWeddingCards) {
        global.fallbackWeddingCards = global.fallbackWeddingCards.filter((c) => c.userId !== id);
      }
    }

    return NextResponse.json({
      success: true,
      message: "User account and associated cards deleted successfully.",
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error deleting user";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
