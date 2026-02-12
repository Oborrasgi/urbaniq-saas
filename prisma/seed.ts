import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ==============================
  // 1️⃣ Create Plans
  // ==============================

  const proPlan = await prisma.plan.upsert({
    where: { slug: "pro" },
    update: {},
    create: {
      slug: "pro",
      title: "PRO",
      description: "Professional plan",
      monthlyPrice: 59,
      hasAvm: true,
      hasLegalAI: false,
      hasLeadScoring: true,
      hasApiAccess: false,
      monthlyCredits: 100,
    },
  });

  const businessPlan = await prisma.plan.upsert({
    where: { slug: "business" },
    update: {},
    create: {
      slug: "business",
      title: "BUSINESS",
      description: "Business plan",
      monthlyPrice: 129,
      hasAvm: true,
      hasLegalAI: true,
      hasLeadScoring: true,
      hasApiAccess: true,
      monthlyCredits: 500,
    },
  });

  // ==============================
  // 2️⃣ Create REAL Super Admin (internal)
  // ==============================

  const superAdminEmail = "superadmin@urbaniq.com";
  const superAdminPassword = "SuperAdmin123!";

  const existingSuperAdmin = await prisma.user.findUnique({
    where: { email: superAdminEmail },
  });

  if (!existingSuperAdmin) {
    const hashedSuperAdminPassword = await bcrypt.hash(superAdminPassword, 10);

    await prisma.user.create({
      data: {
        name: "UrbanIQ Super Admin",
        email: superAdminEmail,
        password: hashedSuperAdminPassword,
        hasAccess: true,
        role: "ADMIN", // 🔐 Real internal admin
        credits: 999999,
      },
    });

    console.log("✅ Super Admin created");
    console.log(`📧 Email: ${superAdminEmail}`);
    console.log(`🔑 Password: ${superAdminPassword}`);
  } else {
    console.log("⚠️  Super Admin already exists");
  }

  // ==============================
  // 3️⃣ Create BUSINESS Commercial User
  // ==============================

  const businessEmail = "business@urbaniq.com";
  const businessPassword = "Business123!";

  const existingBusinessUser = await prisma.user.findUnique({
    where: { email: businessEmail },
  });

  if (!existingBusinessUser) {
    const hashedBusinessPassword = await bcrypt.hash(businessPassword, 10);

    await prisma.user.create({
      data: {
        name: "BUSINESS Commercial User",
        email: businessEmail,
        password: hashedBusinessPassword,
        hasAccess: true,
        role: "BUSINESS",
        credits: 1000,
        planId: businessPlan.id,
      },
    });

    console.log("✅ BUSINESS user created");
    console.log(`📧 Email: ${businessEmail}`);
    console.log(`🔑 Password: ${businessPassword}`);
  } else {
    console.log("⚠️  BUSINESS user already exists");
  }

  // ==============================
  // 4️⃣ Create ENTERPRISE Demo User
  // ==============================

  const enterprisePlan = await prisma.plan.upsert({
    where: { slug: "enterprise" },
    update: {},
    create: {
      slug: "enterprise",
      title: "ENTERPRISE",
      description: "Enterprise demo plan",
      monthlyPrice: 299,
      hasAvm: true,
      hasLegalAI: true,
      hasLeadScoring: true,
      hasApiAccess: true,
      monthlyCredits: 2000,
    },
  });

  const enterpriseEmail = "enterprise@urbaniq.com";
  const enterprisePassword = "Enterprise123!";

  const existingEnterpriseUser = await prisma.user.findUnique({
    where: { email: enterpriseEmail },
  });

  if (!existingEnterpriseUser) {
    const hashedEnterprisePassword = await bcrypt.hash(enterprisePassword, 10);

    await prisma.user.create({
      data: {
        name: "ENTERPRISE Demo User",
        email: enterpriseEmail,
        password: hashedEnterprisePassword,
        hasAccess: true,
        role: "BUSINESS",
        credits: 5000,
        planId: enterprisePlan.id,
      },
    });

    console.log("✅ ENTERPRISE demo user created");
    console.log(`📧 Email: ${enterpriseEmail}`);
    console.log(`🔑 Password: ${enterprisePassword}`);
  } else {
    console.log("⚠️  ENTERPRISE user already exists");
  }

  // ==============================
  // 3️⃣ Create Test PRO User
  // ==============================

  const testEmail = "pro@urbaniq.com";
  const testPassword = "Pro123!";

  const existingTestUser = await prisma.user.findUnique({
    where: { email: testEmail },
  });

  if (!existingTestUser) {
    const hashedTestPassword = await bcrypt.hash(testPassword, 10);

    await prisma.user.create({
      data: {
        name: "PRO Test User",
        email: testEmail,
        password: hashedTestPassword,
        hasAccess: true,
        role: "PRO",
        credits: 200,
        planId: proPlan.id, // Link to PRO plan
      },
    });

    console.log("✅ PRO test user created successfully");
    console.log(`📧 Email: ${testEmail}`);
    console.log(`🔑 Password: ${testPassword}`);
  } else {
    console.log("⚠️  PRO test user already exists");
  }

  // ==============================
  // 5️⃣ Create Demo Leads for PRO User
  // ==============================

  const proUser = await prisma.user.findUnique({
    where: { email: "pro@urbaniq.com" }
  });

  if (proUser) {
    await prisma.lead.createMany({
      data: [
        {
          name: "Carlos Ruiz",
          email: "carlos@example.com",
          phone: "600123456",
          address: "Calle Mayor 12",
          city: "Tarragona",
          propertyType: "Apartment",
          estimatedValue: 210000,
          score: 87,
          intentWindow: "30",
          userId: proUser.id
        },
        {
          name: "Marta López",
          email: "marta@example.com",
          phone: "600654321",
          address: "Av. Catalunya 45",
          city: "Reus",
          propertyType: "House",
          estimatedValue: 320000,
          score: 72,
          intentWindow: "60",
          userId: proUser.id
        }
      ]
    });

    console.log("✅ Demo leads created for PRO user");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });