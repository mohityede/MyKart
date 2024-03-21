import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/order.js";
import asyncWrapper from "../utils/asyncWrapper.js";

const router = Router();

// get all orders - GET /api/v1/order/all
router.get("/all", asyncWrapper(getAllOrders));
// get my orders - GET /api/v1/order/myOrders
router.get("/my", asyncWrapper(getMyOrders));
// get single order - GET /api/v1/order/:id
router.get("/:id", asyncWrapper(getOrderById));

// create new order - POST /api/v1/order/new
router.post("/new", asyncWrapper(createOrder));

// update order status - PUT /api/v1/order/:id
router.put("/:id", asyncWrapper(updateOrderStatus));

// delete order - DELETE /api/v1/order/:id
router.delete("/:id", asyncWrapper(deleteOrder));

export default router;
