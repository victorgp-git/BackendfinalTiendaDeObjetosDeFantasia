import { Router } from "express";
import { getDashboardSummary } from "../controllers/dashboard.controller.js";

const router = Router();

// GET http://localhost:3000/api/dashboard/summary
router.get("/summary", getDashboardSummary);

export default router;