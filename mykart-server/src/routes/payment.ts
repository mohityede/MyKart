import { Router } from "express";
import asyncWrapper from "../utils/asyncWrapper.js";
import {
  createCoupen,
  deleteCoupon,
  getAllCoupons,
  getCoupon,
} from "../controllers/payment.js";

const router = Router();

// get all coupon - GET /api/v1/payment/coupon/all
router.get("/coupon/all", asyncWrapper(getAllCoupons));
// get coupon - GET /api/v1/payment/coupon
router.get("/coupon", asyncWrapper(getCoupon));

// create new Coupon - POST /api/v1/payment/coupon/new
router.post("/coupon/new", asyncWrapper(createCoupen));

// delet coupon by id - DELETE /api/v1/payment/coupon/:id
router.delete("/coupon/:id", asyncWrapper(deleteCoupon));

export default router;
