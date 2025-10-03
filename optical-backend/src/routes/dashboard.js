import express from "express";
import { prisma } from "../prismaClient.js";

const router = express.Router();

// GET /api/dashboard
router.get("/", async (_req, res) => {
  try {
    const totalOrders = await prisma.order.count();
    const activeBrands = await prisma.brand.count({ where: { active: true } });
    const users = await prisma.user.count();

    res.json({
      totalOrders,
      activeBrands,
      users,
    });
  } catch (err) {
    console.error("❌ Error fetching dashboard data:", err);
    res.status(500).json({ error: "Failed to load dashboard data" });
  }
});

export default router;