// src/routes/orders.js

import express from "express";
import prisma from "../prismaClient.js";

const router = express.Router();

// GET /api/orders
router.get("/", async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        product: true,
        user: true,
        brand: true,
      },
    });

    // ✅ Always return something, even if empty
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

export default router;