import pool from "../config/db.js";
import bcrypt from "bcrypt";

export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { name, email, password } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    if (!email || !email.includes("@")) {
      return res.status(400).json({
        message: "Valid email is required",
      });
    }

    if (password && password.trim() !== "") {
      if (password.length < 6) {
        return res.status(400).json({
          message: "Password must be at least 6 characters",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await pool.query(
        `
        UPDATE users
        SET name=$1, email=$2, password=$3
        WHERE id=$4
        RETURNING id, name, email, role
        `,
        [name, email, hashedPassword, userId],
      );

      return res.json(result.rows[0]);
    }

    const result = await pool.query(
      `
      UPDATE users
      SET name=$1, email=$2
      WHERE id=$3
      RETURNING id, name, email, role
      `,
      [name, email, userId],
    );

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const result = await pool.query(
      `
      SELECT id, name, email, role
      FROM users
      ORDER BY id DESC
      `,
    );

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await pool.query(
      `
      DELETE FROM users
      WHERE id = $1
      `,
      [req.params.id],
    );

    res.json({
      message: "User deleted",
    });
  } catch (err) {
    next(err);
  }
};

export const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    const result = await pool.query(
      `
      UPDATE users
      SET role = $1
      WHERE id = $2
      RETURNING id, name, email, role
      `,
      [role, req.params.id],
    );

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, role
      `,
      [name, email, hashedPassword, role],
    );

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};
