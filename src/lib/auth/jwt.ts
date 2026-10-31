import { SignJWT, jwtVerify } from "jose";
import { Role } from "@prisma/client";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar?: string | null;
}

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-for-development-must-be-32-chars-long";
const encodedKey = new TextEncoder().encode(JWT_SECRET);

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

