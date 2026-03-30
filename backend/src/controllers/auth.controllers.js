import { pool } from "../config/db.js";

export const getKitchens = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM kitchens");
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const createKitchen = async (req, res) => {
  try {
    if (req.user.role !== "manager") {
      return res.status(403).json({ message: "Only manager can add kitchen" });
    }

    const { name, description, price, image } = req.body;

    const result = await pool.query(
      "INSERT INTO kitchens (name, description, price, image) VALUES ($1,$2,$3,$4) RETURNING *",
      [name, description, price, image],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateKitchen = async (req, res) => {
  try {
    if (req.user.role !== "manager") {
      return res.status(403).json({ message: "Only manager can update" });
    }

    const { id } = req.params;
    const { name, description, price, image } = req.body;

    const result = await pool.query(
      "UPDATE kitchens SET name=$1, description=$2, price=$3, image=$4 WHERE id=$5 RETURNING *",
      [name, description, price, image, id],
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteKitchen = async (req, res) => {
  try {
    if (req.user.role !== "manager") {
      return res.status(403).json({ message: "Only manager can delete" });
    }

    const { id } = req.params;

    await pool.query("DELETE FROM kitchens WHERE id=$1", [id]);

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
