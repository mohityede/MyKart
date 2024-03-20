import { Router } from "express";
import { getAllOrders } from "../controllers/order.js";
import asyncWrapper from "../utils/asyncWrapper.js";

const router = Router();

// get all orders - GET /api/v1/order/all
router.get("/all", asyncWrapper(getAllOrders));

export default router;
