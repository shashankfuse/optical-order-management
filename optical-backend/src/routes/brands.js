// src/routes/brands.js
import express from "express";
import prisma from "../prismaClient.js";

const router = express.Router();

// GET /api/brands
router.get("/", async (req, res) => {
  try {
    const brands = await prisma.brand.findMany({
      include: { products: true },
    });

    res.json(brands); // return [] if none
  } catch (error) {
    console.error("Error fetching brands:", error.message);
    res.status(500).json({ error: "Failed to fetch brands" });
  }
});

export default router;