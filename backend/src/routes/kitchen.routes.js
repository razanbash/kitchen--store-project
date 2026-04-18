import express from "express";
import {
  getKitchens,
  createKitchen,
  updateKitchen,
  deleteKitchen,
} from "../controllers/kitchen.controllers.js";

import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getKitchens);

router.post("/", verifyToken, createKitchen);

router.put("/:id", verifyToken, updateKitchen);

router.delete("/:id", verifyToken, deleteKitchen);

export default router;
