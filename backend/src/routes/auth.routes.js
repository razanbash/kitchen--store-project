import express from "express";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";
import kitchenRoutes from "./kitchen.routes.js";
import authRoutes from "./auth.routes.js";
const router = express.Router();

//////////////////////////////////////////////////////////////////////////

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email],
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const result = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, password, "user"],
    );

    res.json({
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

///////////////////////////////////////////////////////////////////////////////
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = result.rows[0];

    if (user.password !== password) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, "secret123", {
      expiresIn: "1d",
    });

    res.json({
      message: "Login success",
      token,
      user,
    });
  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
