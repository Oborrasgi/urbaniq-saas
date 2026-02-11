import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const adminEmail = "admin@urbaniq.com";
  const adminPassword = "Admin123!";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log("⚠️  Admin user already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.create({
    data: {
      name: "Admin UrbanIQ",
      email: adminEmail,
      password: hashedPassword,
      hasAccess: true,
      role: "ADMIN",
      credits: 1000,
    },
  });

  console.log("✅ Admin user created successfully");
  console.log(`📧 Email: ${adminEmail}`);
  console.log(`🔑 Password: ${adminPassword}`);
  console.log("\n⚠️  IMPORTANTE: Cambia la contraseña después del primer login\n");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
