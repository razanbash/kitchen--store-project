import db from "../config/db.js";

export const createReservation = async (req, res) => {
  try {
    const { kitchen_id } = req.body;
    const user_id = req.user.id;

    const result = await db.query(
      `INSERT INTO reservations (user_id, kitchen_id)
       VALUES ($1, $2)
       RETURNING *`,
      [user_id, kitchen_id],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//////////////////////

export const getMyReservations = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT 
        reservations.id,
        reservations.status,
        reservations.created_at,
        reservations.updated_at,
        kitchens.name
      FROM reservations
      JOIN kitchens ON reservations.kitchen_id = kitchens.id
      WHERE reservations.user_id = $1
      ORDER BY reservations.id DESC`,
      [req.user.id],
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//////////////////////////
export const getReservations = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT
        reservations.id,
        reservations.status,
        reservations.created_at,
        reservations.updated_at,

        users.email AS user_email,
        kitchens.name AS kitchen_name

      FROM reservations

      JOIN users
      ON reservations.user_id = users.id

      JOIN kitchens
      ON reservations.kitchen_id = kitchens.id

      ORDER BY reservations.id DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

/////////////////////////
export const approveReservation = async (req, res) => {
  try {
    const result = await db.query(
      `UPDATE reservations
       SET status = 'approved',
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING *`,
      [req.params.id],
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
/////////////////////////
export const rejectReservation = async (req, res) => {
  try {
    const result = await db.query(
      `UPDATE reservations
       SET status = 'rejected',
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING *`,
      [req.params.id],
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

///////////////////
export const deleteReservation = async (req, res) => {
  try {
    await db.query(
      `
      DELETE FROM reservations
      WHERE id = $1
      `,
      [req.params.id],
    );

    res.json({
      message: "Reservation deleted",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
