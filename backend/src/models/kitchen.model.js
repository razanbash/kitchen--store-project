import { pool } from "../config/db.js";

export const getAllKitchens = async () => {
  const result = await pool.query("SELECT * FROM kitchens ORDER BY id DESC");
  return result.rows;
};

export const createKitchenModel = async (name, description, price, image) => {
  const result = await pool.query(
    "INSERT INTO kitchens (name, description, price, image) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, description, price, image],
  );
  return result.rows[0];
};

export const updateKitchenModel = async (
  id,
  name,
  description,
  price,
  image,
) => {
  const result = await pool.query(
    "UPDATE kitchens SET name=$1, description=$2, price=$3, image=$4 WHERE id=$5 RETURNING *",
    [name, description, price, image, id],
  );
  return result.rows[0];
};

export const deleteKitchenModel = async (id) => {
  await pool.query("DELETE FROM kitchens WHERE id=$1", [id]);
};
