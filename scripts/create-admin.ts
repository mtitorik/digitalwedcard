import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function createAdmin() {
  const email = "torikul0598@gmail.com".toLowerCase().trim();
  const rawPassword = "O16268485o6@";
  const name = "Torikul Islam";

  console.log(`🔐 Creating/Updating Admin Account for: ${email}`);

  const passwordHash = await bcrypt.hash(rawPassword, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      passwordHash,
      role: Role.ADMIN,
      name,
    },
    create: {
      email,
      name,
      passwordHash,
      role: Role.ADMIN,
    },
  });

  // Verify that the password hashes match
  const isValid = await bcrypt.compare(rawPassword, user.passwordHash);

  console.log("✅ Admin account successfully created!");
  console.log({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    passwordVerified: isValid,
  });
}

createAdmin()
  .catch((e) => {
    console.error("❌ Failed to create admin account:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

