// src/routes/users.js
import express from "express";
import prisma from "../prismaClient.js";

const router = express.Router();

// GET /api/users
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users); // return [] if none
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

export default router;