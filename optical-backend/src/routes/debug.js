// src/routes/debug.js
import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Check brands
router.get("/brands", async (_req, res) => {
  try {
    const brands = await prisma.brand.findMany({
      include: { products: true },
    });
    res.json(brands);
  } catch (err) {
    console.error("Debug brands error:", err);
    res.status(500).json({ error: "Debug failed (brands)" });
  }
});

// Check products
router.get("/products", async (_req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { brand: true },
    });
    res.json(products);
  } catch (err) {
    console.error("Debug products error:", err);
    res.status(500).json({ error: "Debug failed (products)" });
  }
});

// Check orders
router.get("/orders", async (_req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: { brand: true, product: true, user: true },
    });
    res.json(orders);
  } catch (err) {
    console.error("Debug orders error:", err);
    res.status(500).json({ error: "Debug failed (orders)" });
  }
});

export default router;