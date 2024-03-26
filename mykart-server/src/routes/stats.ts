import { Router } from "express";
import asyncWrapper from "../utils/asyncWrapper.js";
import {
  getBarChartStats,
  getDashboardStats,
  getLineChartStats,
  getPieChartStats,
} from "../controllers/stats.js";

const router = Router();

// to get dashboard stats - GET /api/v1/stats/dashboard
router.get("/dashboard", asyncWrapper(getDashboardStats));
// to get pie chart stats - GET /api/v1/stats/piechart
router.get("/piechart", asyncWrapper(getPieChartStats));
// to get bar chart stats - GET /api/v1/stats/barhart
router.get("/barchart", asyncWrapper(getBarChartStats));
// to get line chart stats - GET /api/v1/stats/linechart
router.get("/linechart", asyncWrapper(getLineChartStats));

export default router;
