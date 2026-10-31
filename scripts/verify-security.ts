import { PrismaClient, Role } from "@prisma/client";
import { SignJWT } from "jose";

const db = new PrismaClient();
const AUTH_SECRET = process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET || "fallback-secret-for-development-must-be-32-chars-long";
const encodedKey = new TextEncoder().encode(AUTH_SECRET);

async function runSecurityTests() {
  console.log("🔒 Running Comprehensive Security & RBAC Test Suite...\n");

  const baseUrl = "http://localhost:3000";

  // 1. Fetch Users from Database
  const adminUser = await db.user.findFirst({ where: { role: Role.ADMIN } });
  const standardUser = await db.user.findFirst({ where: { role: Role.USER } });

  if (!adminUser || !standardUser) {
    throw new Error("Both an ADMIN and a USER account are required for testing.");
  }

  console.log(`👤 Admin Account: ${adminUser.email} (Role: ${adminUser.role})`);
  console.log(`👤 Standard Account: ${standardUser.email} (Role: ${standardUser.role})\n`);

  // 2. Generate Tokens
  const adminToken = await new SignJWT({
    id: adminUser.id,
    email: adminUser.email,
    name: adminUser.name || "Admin",
    role: adminUser.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);

  const standardUserToken = await new SignJWT({
    id: standardUser.id,
    email: standardUser.email,
    name: standardUser.name || "Standard User",
    role: standardUser.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);

  // TEST 1: Unauthenticated Visitor accessing /admin
  console.log("TEST 1: Unauthenticated visitor accessing /admin");
  const unauthRes = await fetch(`${baseUrl}/admin`, { redirect: "manual" });
  console.log(`  -> Status: ${unauthRes.status}`);
  const redirectLocation = unauthRes.headers.get("location") || "";
  console.log(`  -> Redirect Target: ${redirectLocation}`);
  if (unauthRes.status !== 307 || !redirectLocation.includes("/login")) {
    throw new Error("FAILED: Unauthenticated user was NOT redirected to /login!");
  }
  console.log("  ✅ PASSED: Correctly routed to standard login screen with callbackUrl\n");

  // TEST 2: Standard User (role === "USER") accessing /admin
  console.log("TEST 2: Standard user (role === 'USER') accessing /admin");
  const standardRes = await fetch(`${baseUrl}/admin`, {
    headers: { Cookie: `auth_session=${standardUserToken}` },
    redirect: "manual",
  });
  console.log(`  -> Status: ${standardRes.status}`);
  const standardRedirect = standardRes.headers.get("location") || "";
  console.log(`  -> Redirect Target: ${standardRedirect}`);
  if (standardRes.status !== 307 || !standardRedirect.includes("/unauthorized")) {
    throw new Error("FAILED: Standard user was NOT bounced away from admin route!");
  }
  console.log("  ✅ PASSED: Standard user bounced away with access denied redirect\n");

  // TEST 3: Administrator (role === "ADMIN") accessing /admin
  console.log("TEST 3: Administrator (role === 'ADMIN') accessing /admin");
  const adminRes = await fetch(`${baseUrl}/admin`, {
    headers: { Cookie: `auth_session=${adminToken}` },
    redirect: "manual",
  });
  console.log(`  -> Status: ${adminRes.status}`);
  if (adminRes.status !== 200) {
    throw new Error(`FAILED: Admin user was rejected with status ${adminRes.status}!`);
  }
  console.log("  ✅ PASSED: Administrator granted full access (HTTP 200)\n");

  // TEST 4: Single Unified Login Page inspection
  console.log("TEST 4: Inspecting /login page for privacy and lack of admin hints");
  const loginHtmlRes = await fetch(`${baseUrl}/login`);
  const loginHtml = await loginHtmlRes.text();
  if (loginHtml.includes("Quick Demo Logins") || loginHtml.includes("Admin Account") || loginHtml.includes("Administrative & Client Access")) {
    throw new Error("FAILED: /login contains public hints of administrative accounts!");
  }
  console.log("  ✅ PASSED: /login is single unified page with zero administrative hints\n");

  // TEST 5: Public Homepage inspection for unauthenticated visitors
  console.log("TEST 5: Inspecting / homepage for unauthenticated visitors");
  const homeHtmlRes = await fetch(`${baseUrl}/`);
  const homeHtml = await homeHtmlRes.text();
  if (homeHtml.includes("Admin Suite") || homeHtml.includes("Open Admin Dashboard")) {
    throw new Error("FAILED: Homepage leaks admin buttons to unauthenticated public visitors!");
  }
  console.log("  ✅ PASSED: Public homepage has no admin hints or toggles for unauthenticated visitors\n");

  console.log("🛡️ ALL 5 CRITICAL SECURITY & RBAC SPECIFICATIONS VERIFIED 100% SUCCESSFUL!");
}

runSecurityTests()
  .catch((e) => {
    console.error("❌ Test failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

