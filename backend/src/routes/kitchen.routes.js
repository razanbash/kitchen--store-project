import express from "express";
import {
  getKitchens,
  createKitchen,
  updateKitchen,
  deleteKitchen,
} from "../controllers/kitchen.controllers.js";

import {protect} from "../middleware/authMiddleware.js";  

const router = express.Router();

router.get("/", getKitchens);

router.post("/", protect, createKitchen);

router.put("/:id", protect, updateKitchen);

router.delete("/:id", protect, deleteKitchen);

export default router;
