// src/index.js
import express from "express";
import cors from "cors";
import prisma from "./prismaClient.js";  // ✅ default import (no { })

// Import routes
import ordersRouter from "./routes/orders.js";
import productsRouter from "./routes/products.js";
import brandsRouter from "./routes/brands.js";
import usersRouter from "./routes/users.js";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/orders", ordersRouter);
app.use("/api/products", productsRouter);
app.use("/api/brands", brandsRouter);
app.use("/api/users", usersRouter);

// Health check
app.get("/", (req, res) => {
  res.send("✅ Optical Backend API is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});