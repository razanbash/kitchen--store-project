import pool from "../config/db.js";

export const createFeedback = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const userId = req.user.id;

    const result = await pool.query(
      "INSERT INTO feedbacks (user_id, message) VALUES ($1, $2) RETURNING *",
      [userId, message],
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getFeedbacks = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM feedbacks");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
};

export const approveFeedback = async (req, res) => {
  const { id } = req.params;

  await pool.query("UPDATE feedbacks SET status='approved' WHERE id=$1", [id]);

  res.json({ message: "Approved" });
};

export const rejectFeedback = async (req, res) => {
  const { id } = req.params;

  await pool.query("UPDATE feedbacks SET status='rejected' WHERE id=$1", [id]);

  res.json({ message: "Rejected" });
};

export const getApprovedFeedbacks = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM feedbacks WHERE status = 'approved' ORDER BY id DESC",
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




export const deleteFeedback = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM feedbacks WHERE id=$1", [id]);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};