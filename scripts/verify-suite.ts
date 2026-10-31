import { PrismaClient, Role } from "@prisma/client";
import { SignJWT } from "jose";

const db = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-for-development-must-be-32-chars-long";
const encodedKey = new TextEncoder().encode(JWT_SECRET);

async function verify() {
  console.log("🔍 Running full verification suite for Digital Wedding Platform...");

  // 1. Verify Database Models
  const users = await db.user.findMany();
  console.log(`✅ Users in DB: ${users.length}`);

  const templates = await db.template.findMany();
  console.log(`✅ Templates in DB: ${templates.length}`);

  const invitations = await db.invitation.findMany({
    include: { schedules: true, rsvps: true },
  });
  console.log(`✅ Invitations in DB: ${invitations.length}`);
  for (const inv of invitations) {
    console.log(`   - /i/${inv.slug}: ${inv.brideName} & ${inv.groomName} (${inv.schedules.length} events, ${inv.rsvps.length} RSVPs)`);
  }

  // 2. Test Admin JWT Token Generation
  const adminUser = users.find((u) => u.role === Role.ADMIN);
  if (!adminUser) throw new Error("No admin found!");

  const token = await new SignJWT({
    id: adminUser.id,
    email: adminUser.email,
    name: adminUser.name || "Admin",
    role: adminUser.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);

  console.log("✅ Admin JWT session token successfully generated");

  // 3. Test HTTP Fetch to Admin Routes with Cookie
  const baseUrl = "http://localhost:3000";
  const routes = [
    "/admin",
    "/admin/templates",
    "/admin/templates/new",
    "/admin/invitations",
    `/admin/invitations/${invitations[0].id}`,
    "/admin/users",
    "/i/sarah-alexander",
  ];

  for (const route of routes) {
    const res = await fetch(`${baseUrl}${route}`, {
      headers: {
        Cookie: `auth_session=${token}`,
      },
      redirect: "manual",
    });
    console.log(`🌐 Route ${route} -> Status: ${res.status}`);
    if (res.status !== 200) {
      throw new Error(`Route ${route} failed with status ${res.status}`);
    }
  }

  console.log("🎉 ALL ROUTES AND SYSTEM COMPONENTS VERIFIED SUCCESSFULLY!");
}

verify()
  .catch((e) => {
    console.error("❌ Verification failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
