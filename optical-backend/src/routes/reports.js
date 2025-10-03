import express from "express";
import { prisma } from "../prismaClient.js";

const router = express.Router();

// GET /api/reports?brandId=1&status=Pending&from=2025-09-01&to=2025-09-30
router.get("/", async (req, res) => {
  try {
    const { brandId, status, from, to } = req.query;

    const where = {};

    if (brandId) where.brandId = Number(brandId);
    if (status) where.status = status;
    if (from && to) {
      where.orderDateISO = {
        gte: from,
        lte: to,
      };
    } else if (from) {
      where.orderDateISO = { gte: from };
    } else if (to) {
      where.orderDateISO = { lte: to };
    }

    const reports = await prisma.order.findMany({
      where,
      select: {
        id: true,
        orderNumber: true,
        customerName: true,
        orderDateISO: true,
        status: true,
        brand: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 100, // up to 100 results
    });

    const formatted = reports.map((r) => ({
      id: r.id,
      orderNumber: r.orderNumber,
      customerName: r.customerName,
      brand: r.brand.name,
      date: r.orderDateISO,
      status: r.status,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("❌ Error fetching reports:", err);
    res.status(500).json({ error: "Failed to load reports" });
  }
});

export default router;