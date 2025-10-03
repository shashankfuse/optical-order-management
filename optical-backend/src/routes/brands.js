import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// GET all brands (with products)
router.get("/", async (req, res) => {
  try {
    const brands = await prisma.brand.findMany({
      include: { products: true },
      orderBy: { name: "asc" },
    });
    res.json(brands);
  } catch (err) {
    console.error("❌ Error fetching brands:", err);
    res.status(500).json({ error: "Failed to fetch brands" });
  }
});

export default router;