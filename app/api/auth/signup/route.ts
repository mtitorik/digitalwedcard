import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { UserModel, FallbackUser } from "@/models/User";
import { hashPassword } from "@/lib/password";
import { signUserToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Please provide your full name, email, and password." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const passwordHash = hashPassword(password);

    const mongooseConn = await connectToDatabase();

    let createdUser: { id: string; name: string; email: string; role: "user" | "admin" };

    if (mongooseConn) {
      const existing = await UserModel.findOne({ email: cleanEmail });
      if (existing) {
        return NextResponse.json(
          { success: false, message: "An account with this email address already exists. Please sign in." },
          { status: 409 }
        );
      }

      const newUser = await UserModel.create({
        name: cleanName,
        email: cleanEmail,
        passwordHash,
        role: "user",
      });

      createdUser = {
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        role: "user",
      };
    } else {
      if (!global.fallbackUsers) global.fallbackUsers = [];

      const existing = global.fallbackUsers.find((u) => u.email === cleanEmail);
      if (existing) {
        return NextResponse.json(
          { success: false, message: "An account with this email address already exists. Please sign in." },
          { status: 409 }
        );
      }

      const newFallbackUser: FallbackUser = {
        _id: "user-" + Date.now(),
        name: cleanName,
        email: cleanEmail,
        passwordHash,
        role: "user",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      global.fallbackUsers.push(newFallbackUser);

      createdUser = {
        id: newFallbackUser._id,
        name: newFallbackUser.name,
        email: newFallbackUser.email,
        role: "user",
      };
    }

    const token = await signUserToken(createdUser);

    const response = NextResponse.json({
      success: true,
      message: "Account created successfully! Welcome aboard.",
      user: createdUser,
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

    return response;
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error creating account";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
