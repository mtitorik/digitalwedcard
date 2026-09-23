import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { recordUserActivity } from "@/lib/presence";

export async function GET(req: NextRequest) {
  const user = await getAuthenticatedUser(req);
  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  recordUserActivity(user.email || user.id);

  return NextResponse.json({
    authenticated: true,
    user,
  });
}
