import express from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import {
  addPalette,
  deletePalette,
  getAllPalette,
  getPaletteById,
  updatePalette,
} from "../controllers/palette.controller.js";

const router = express.Router();

router.post("/addPalette", isLoggedIn, addPalette);
router.delete("/deletePalette/:id", isLoggedIn, deletePalette);
router.put("/updatePalette/:id", isLoggedIn, updatePalette);
router.get("/:id", isLoggedIn, getPaletteById);
router.get("/", getAllPalette);

export default router;