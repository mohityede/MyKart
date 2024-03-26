import { Router } from "express";

import isAdmin from "../middlewares/checkAdmin.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import {
  createCoupen,
  createPaymentIntent,
  deleteCoupon,
  getAllCoupons,
  getCoupon,
} from "../controllers/payment.js";

const router = Router();

// get all coupon - GET /api/v1/payment/coupon/all
router.get("/coupon/all", asyncWrapper(isAdmin), asyncWrapper(getAllCoupons));
// get coupon - GET /api/v1/payment/coupon
router.get("/coupon", asyncWrapper(getCoupon));

// create new Coupon - POST /api/v1/payment/coupon/new
router.post("/coupon/new", asyncWrapper(isAdmin), asyncWrapper(createCoupen));
// creat payment intent - POST /api/v1/payment/intent/create
router.post("/intent/create", asyncWrapper(createPaymentIntent));

// delet coupon by id - DELETE /api/v1/payment/coupon/:id
router.delete("/coupon/:id", asyncWrapper(isAdmin), asyncWrapper(deleteCoupon));

export default router;
