import express from "express";

import {
  updateProfile,
  getUsers,
  deleteUser,
  updateUserRole,
  createUser,
} from "../controllers/user.controller.js";

import { protect } from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.put("/profile", protect, updateProfile);

router.get("/", protect, authorize("manager"), getUsers);

router.delete("/:id", protect, authorize("manager"), deleteUser);

router.put("/:id", protect, authorize("manager"), updateUserRole);

router.post("/", protect, authorize("manager"), createUser);

export default router;
