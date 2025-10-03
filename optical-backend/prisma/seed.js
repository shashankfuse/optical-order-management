import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Seed brands
  const essilor = await prisma.brand.upsert({
    where: { name: "Essilor" },
    update: {},
    create: {
      name: "Essilor",
      logoUrl: "/logo-light.svg",
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

  console.log("✅ Seeding completed!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });