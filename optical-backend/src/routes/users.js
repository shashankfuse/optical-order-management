import express from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../prismaClient.js";

const router = express.Router();

/* ----------------------------
   List all users
----------------------------- */
router.get("/", async (_req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users. Please try again later." });
  }
});

/* ----------------------------
   Create user
----------------------------- */
router.post("/", async (req, res) => {
  try {
    const { name, email, password, role = "staff" } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required." });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "Email already exists." });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, passwordHash: hashed, role },
    });

    res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    console.error("❌ Error creating user:", err);
    res.status(500).json({ error: "Failed to create user. Please try again." });
  }
});

/* ----------------------------
   Delete user
----------------------------- */
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.user.delete({ where: { id } });
    res.json({ success: true, message: "User deleted successfully." });
  } catch (err) {
    console.error("❌ Error deleting user:", err);
    res.status(500).json({ error: "Failed to delete user." });
  }
});

export default router;