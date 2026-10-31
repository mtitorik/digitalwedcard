import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { Role } from "@prisma/client";
import db from "@/lib/db";
import { SessionUser } from "@/types";

export const SESSION_COOKIE_NAME = "auth_session";
const SEVEN_DAYS_IN_SECONDS = 7 * 24 * 60 * 60;

const AUTH_SECRET =
  process.env.NEXTAUTH_SECRET ||
  process.env.JWT_SECRET ||
  "fallback-secret-for-development-must-be-32-chars-long";
const encodedKey = new TextEncoder().encode(AUTH_SECRET);

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: SEVEN_DAYS_IN_SECONDS,
  },
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const normalizedEmail = credentials.email.toLowerCase().trim();
        const user = await db.user.findUnique({
          where: { email: normalizedEmail },
        });

        if (!user || !user.passwordHash) {
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as unknown as { role: Role }).role;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.email = token.email as string;
        session.user.name = token.name;
      }
      return session;
    },
  },
  secret: AUTH_SECRET,
};

export async function signJwtToken(user: SessionUser): Promise<string> {
  return new SignJWT({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    avatar: user.avatar,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function verifyJwtToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });

    if (!payload || !payload.id || !payload.email || !payload.role) {
      return null;
    }

    return {
      id: payload.id as string,
      email: payload.email as string,
      name: (payload.name as string) || "",
      role: payload.role as Role,
      avatar: (payload.avatar as string | null) || null,
    };
  } catch {
    return null;
  }
}

export async function createSession(user: SessionUser): Promise<void> {
  const token = await signJwtToken(user);
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure:
      process.env.NODE_ENV === "production" &&
      (process.env.NEXTAUTH_URL?.startsWith("https://") ?? false),
    sameSite: "lax",
    path: "/",
    maxAge: SEVEN_DAYS_IN_SECONDS,
    expires: new Date(Date.now() + SEVEN_DAYS_IN_SECONDS * 1000),
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  cookieStore.delete("next-auth.session-token");
  cookieStore.delete("__Secure-next-auth.session-token");
}

export async function getServerAuthSession() {
  return getServerSession(authOptions);
}

export async function getSession(): Promise<SessionUser | null> {
  // 1. Primary check: custom session JWT cookie
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (token) {
      const verified = await verifyJwtToken(token);
      if (verified) {
        return verified;
      }
    }
  } catch {
    // Proceed to fallback
  }

  // 2. Fallback check: NextAuth session if available
  try {
    const nextAuthSession = await getServerSession(authOptions);
    if (nextAuthSession?.user?.id && nextAuthSession?.user?.email && nextAuthSession?.user?.role) {
      return {
        id: nextAuthSession.user.id,
        email: nextAuthSession.user.email,
        name: nextAuthSession.user.name || "",
        role: nextAuthSession.user.role,
        avatar: nextAuthSession.user.image || null,
      };
    }
  } catch {
    // Ignore fallback errors
  }

  return null;
}

export async function requireUser(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) {
    redirect("/?auth=signin");
  }
  return session;
}

export async function requireAdmin(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) {
    redirect("/?auth=signin&callbackUrl=/admin");
  }

  if (session.role !== Role.ADMIN) {
    redirect("/unauthorized");
  }

  return session;
}
