// src/routes/products.js
import express from "express";
import prisma from "../prismaClient.js";

const router = express.Router();

// GET /api/products
router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { brand: true },
    });

    res.json(products); // return [] if none
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

export default router;