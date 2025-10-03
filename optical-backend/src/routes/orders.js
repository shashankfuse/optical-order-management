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

    res.json(orders); // [] if none
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// POST /api/orders (create new order)
router.post("/", async (req, res) => {
  try {
    const { userId, brandId, productId, notes } = req.body;

    const newOrder = await prisma.order.create({
      data: {
        orderNumber: `ORD-${Date.now()}`, // Unique order number
        userId,
        brandId,
        productId,
        status: "PENDING",
        notes,
      },
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).json({ error: "Failed to create order" });
  }
});

export default router;