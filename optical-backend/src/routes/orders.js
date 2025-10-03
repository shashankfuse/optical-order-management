import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

/**
 * Generate next order number
 * Format: ORD-001, ORD-002, ...
 */
async function generateOrderNumber() {
  const lastOrder = await prisma.order.findFirst({
    orderBy: { id: "desc" },
  });

  const lastNumber = lastOrder
    ? parseInt(lastOrder.orderNumber.replace("ORD-", ""))
    : 0;

  const nextNumber = lastNumber + 1;
  return `ORD-${String(nextNumber).padStart(3, "0")}`;
}

// ✅ Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: { brand: true, product: true, user: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// ✅ Create new order
router.post("/", async (req, res) => {
  try {
    const {
      customerName,
      receiptNo,
      brandId,
      productId,
      userId,
      lensType,
      features,
      tintCode,
      fitting,
      odDetails,
      osDetails,
      invoiceNumber,
      orderDateISO,
      arrivalISO,
    } = req.body;

    const orderNumber = await generateOrderNumber();

    const newOrder = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        receiptNo,
        brandId,
        productId,
        userId,
        lensType,
        features,
        tintCode,
        fitting,
        odDetails,
        osDetails,
        invoiceNumber,
        orderDateISO,
        arrivalISO,
      },
    });

    res.json(newOrder);
  } catch (err) {
    console.error("❌ Error creating order:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

export default router;