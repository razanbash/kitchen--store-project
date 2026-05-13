import express from "express";

import {
  createFeedback,
  getFeedbacks,
  approveFeedback,
  rejectFeedback,
  getApprovedFeedbacks,
  deleteFeedback,
} from "../controllers/feedback.controller.js";

import { protect } from "../middleware/authMiddleware.js";

import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, createFeedback);

router.get("/", protect, getFeedbacks);

router.put("/approve/:id", protect, authorize("manager"), approveFeedback);

router.put("/reject/:id", protect, authorize("manager"), rejectFeedback);

router.get("/approved", protect, getApprovedFeedbacks);

router.delete("/:id", protect, authorize("manager"), deleteFeedback);

export default router;
