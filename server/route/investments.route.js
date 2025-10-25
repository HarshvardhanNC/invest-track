import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getInvestments,
  getInvestment,
  createInvestment,
  updateInvestment,
  deleteInvestment,
} from "../controller/investments.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getInvestments);
router.get("/:id", authMiddleware, getInvestment);
router.post("/", authMiddleware, createInvestment);
router.put("/:id", authMiddleware, updateInvestment);
router.delete("/:id", authMiddleware, deleteInvestment);

export default router;
