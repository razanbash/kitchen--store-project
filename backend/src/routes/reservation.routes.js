import express from "express";
import {
  createReservation,
  getReservations,
  approveReservation,
  rejectReservation,
  getMyReservations,
  deleteReservation,
} from "../controllers/reservation.controller.js";
import { protect } from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, createReservation);

router.get("/", protect, authorize("moderator", "manager"), getReservations);
router.put("/approve/:id", protect, authorize("moderator"), approveReservation);
router.put("/reject/:id", protect, authorize("moderator"), rejectReservation);
router.get("/my", protect, getMyReservations);
router.delete("/:id", protect, authorize("moderator"), deleteReservation);
export default router;
