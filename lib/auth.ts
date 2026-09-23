import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "sajedul_sadia_royal_emerald_secret_key_2026"
);

export const COOKIE_NAME = "wedding_auth_token";
// Legacy cookie name for backwards compatibility
export const LEGACY_ADMIN_COOKIE = "wedding_admin_token";

export interface AuthUserPayload {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
}

export async function signUserToken(payload: AuthUserPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function signAdminToken(payload: { email: string; role: string }): Promise<string> {
  return await new SignJWT({
    id: "admin-system",
    email: payload.email,
    name: "System Administrator",
    role: "admin",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function verifyAuthToken(token: string): Promise<AuthUserPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      id: (payload.id as string) || "admin-system",
      email: payload.email as string,
      name: (payload.name as string) || "Administrator",
      role: (payload.role as "user" | "admin") || "user",
    };
  } catch {
    return null;
  }
}

export async function getAuthenticatedUser(req?: NextRequest): Promise<AuthUserPayload | null> {
  let token: string | undefined;

  if (req) {
    token = req.cookies.get(COOKIE_NAME)?.value || req.cookies.get(LEGACY_ADMIN_COOKIE)?.value;
  } else {
    try {
      const cookieStore = await cookies();
      token = cookieStore.get(COOKIE_NAME)?.value || cookieStore.get(LEGACY_ADMIN_COOKIE)?.value;
    } catch {
      return null;
    }
  }

  if (!token) return null;
  return await verifyAuthToken(token);
}

export async function isAuthenticatedAdmin(req?: NextRequest): Promise<boolean> {
  const user = await getAuthenticatedUser(req);
  return !!user && user.role === "admin";
}
