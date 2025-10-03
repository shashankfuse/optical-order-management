// prisma/seed.js
import prisma from "../src/prismaClient.js";

async function main() {
  console.log("🌱 Seeding database...");

  // Create brands with products
  const essilor = await prisma.brand.upsert({
    where: { name: "Essilor" },
    update: {},
    create: {
      name: "Essilor",
      logoUrl: "/logo-light.svg",
      active: true,
      products: {
        create: [
          {
            name: "Essilor FSV",
            type: "FSV",
            coatings: ["AR", "Blue Cut", "UV"],
            features: ["Tint", "Photochromic"],
            baseTimelineDays: 2,
          },
          {
            name: "Essilor RX Progressive",
            type: "RX_PROG",
            coatings: ["AR", "Blue Cut"],
            features: ["Tint", "Transitions"],
            baseTimelineDays: 4,
          },
        ],
      },
    },
  });

  const hoya = await prisma.brand.upsert({
    where: { name: "Hoya" },
    update: {},
    create: {
      name: "Hoya",
      logoUrl: "/logo-dark.svg",
      active: true,
      products: {
        create: [
          {
            name: "Hoya Finished Bifocal",
            type: "FIN_BIF",
            coatings: ["AR", "UV"],
            features: ["Tint"],
            baseTimelineDays: 2,
          },
        ],
      },
    },
  });

  // Create a default user
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@example.com",
      password: "password123", // ⚠️ For demo only. In production, hash passwords.
    },
  });

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });