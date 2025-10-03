import express from "express";
import { prisma } from "../prismaClient.js";

const router = express.Router();

/* ----------------------------
   Get all products
----------------------------- */
router.get("/", async (_req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { brand: true },
      orderBy: { name: "asc" },
    });
    res.json(products);
  } catch (err) {
    console.error("Error fetching products", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

/* ----------------------------
   Get products by brand
----------------------------- */
router.get("/brand/:brandId", async (req, res) => {
  try {
    const brandId = Number(req.params.brandId);
    if (!brandId) return res.status(400).json({ error: "Invalid brand ID" });

    const products = await prisma.product.findMany({
      where: { brandId },
      orderBy: { name: "asc" },
    });
    res.json(products);
  } catch (err) {
    console.error("Error fetching products for brand", err);
    res.status(500).json({ error: "Failed to fetch products for brand" });
  }
});

/* ----------------------------
   Create new product
----------------------------- */
router.post("/", async (req, res) => {
  try {
    const { name, type, coatings = [], features = [], brandId } = req.body;

    if (!name?.trim() || !brandId) {
      return res.status(400).json({ error: "Name and brandId are required" });
    }

    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        type: type || "FSV",
        coatings,
        features,
        brandId: Number(brandId),
      },
    });

    res.json(product);
  } catch (err) {
    console.error("Error creating product", err);
    res.status(500).json({ error: "Failed to create product" });
  }
});

/* ----------------------------
   Update product
----------------------------- */
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, type, coatings, features, brandId } = req.body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(name ? { name: name.trim() } : {}),
        ...(type ? { type } : {}),
        ...(coatings !== undefined ? { coatings } : {}),
        ...(features !== undefined ? { features } : {}),
        ...(brandId ? { brandId: Number(brandId) } : {}),
      },
    });

    res.json(product);
  } catch (err) {
    console.error("Error updating product", err);
    res.status(500).json({ error: "Failed to update product" });
  }
});

/* ----------------------------
   Delete product
----------------------------- */
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.product.delete({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting product", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;