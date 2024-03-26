import { stripe } from "../app.js";
import { NextFunction, Request, Response } from "express";

import Coupon from "../models/coupon.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getAllCoupons = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const coupons = await Coupon.find();

  res.status(200).json({
    success: true,
    data: coupons,
  });
};

export const getCoupon = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { couponCode } = req.query;

  const coupon = await Coupon.findOne({ couponCode });
  if (!coupon) return next(new ErrorHandler(400, "Invalid coupon code"));

  res.status(201).json({
    success: true,
    data: coupon,
  });
};

export const createCoupen = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { couponCode, amount } = req.body;

  if (!couponCode || !amount)
    return next(new ErrorHandler(400, "please fill all required field"));

  const newCoupon = await Coupon.create({ couponCode, amount });

  res.status(201).json({
    success: true,
    message: `Coupon ${couponCode} created successfully`,
    data: newCoupon,
  });
};

export const createPaymentIntent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { amount } = req.body;
  if (!amount)
    return next(new ErrorHandler(400, "Please enter amount to proceed"));

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(amount) * 100,
    currency: "inr",
  });

  res.status(201).json({
    success: true,
    clientSecret: paymentIntent.client_secret,
  });
};

export const deleteCoupon = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const coupon = await Coupon.findByIdAndDelete(id);
  if (!coupon) return next(new ErrorHandler(400, "Coupon does not exist"));

  res.status(200).json({
    success: true,
    massage: `Coupon ${coupon.couponCode} deleted successfully!`,
  });
};
