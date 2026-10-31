import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { jwtVerify } from "jose";

const AUTH_SECRET =
  process.env.NEXTAUTH_SECRET ||
  process.env.JWT_SECRET ||
  "fallback-secret-for-development-must-be-32-chars-long";
const encodedKey = new TextEncoder().encode(AUTH_SECRET);
const SESSION_COOKIE_NAME = "auth_session";

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Extract role from custom cookie (primary) or NextAuth JWT (fallback)
  let userRole: string | null = null;
  let isAuthenticated = false;

  // 1. Check primary custom session cookie
  const customToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (customToken) {
    try {
      const { payload } = await jwtVerify(customToken, encodedKey, {
        algorithms: ["HS256"],
      });

      if (payload?.role) {
        userRole = payload.role as string;
        isAuthenticated = true;
      }
    } catch {
      // Invalid or expired token
    }
  }

  // 2. Fallback to NextAuth token if not authenticated
  if (!isAuthenticated) {
    try {
      const nextAuthToken = await getToken({
        req: request,
        secret: AUTH_SECRET,
      });

      if (nextAuthToken?.role) {
        userRole = nextAuthToken.role as string;
        isAuthenticated = true;
      }
    } catch {
      // Continue
    }
  }

  // Guard: Protect /admin and all sub-routes
  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      const redirectUrl = new URL("/", request.url);
      redirectUrl.searchParams.set("auth", "signin");
      redirectUrl.searchParams.set("callbackUrl", pathname + search);
      return NextResponse.redirect(redirectUrl);
    }

    if (userRole !== "ADMIN") {
      // 403 Forbidden: Standard users are bounced away
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // Redirect /login entirely to homepage with slide-over drawer
  if (pathname === "/login") {
    if (isAuthenticated) {
      if (userRole === "ADMIN") {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.redirect(new URL("/", request.url));
    }
    const homeWithModal = new URL("/", request.url);
    homeWithModal.searchParams.set("auth", "signin");
    return NextResponse.redirect(homeWithModal);
  }

  // Redirect authenticated users away from /register
  if (pathname === "/register") {
    if (isAuthenticated) {
      if (userRole === "ADMIN") {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
    "/register",
  ],
};
