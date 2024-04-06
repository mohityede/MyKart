import { NextFunction, Request, Response } from "express";

import Order from "../models/order.js";
import ErrorHandler from "../utils/errorHandler.js";
import revalidatesCache from "../utils/revalidateCache.js";
import { appCache } from "../app.js";
import { reduceStock } from "../utils/features.js";
import { NewOrderRequestBody } from "../types/interfaces.js";

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let orders;
  if (appCache.has("allOrders"))
    orders = JSON.parse(appCache.get("allOrders") as string);
  else {
    orders = await Order.find().populate("user", "name");
    appCache.set("allOrders", JSON.stringify(orders));
  }
  return res.status(200).json({ success: true, data: orders });
};

export const getMyOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.query;
  if (!id) return next(new ErrorHandler(400, "Invalid request"));

  const myOrders = await Order.find({ user: id });
  res.status(200).json({
    success: true,
    data: myOrders,
  });
};

export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const order = await Order.findById(id).populate("user");
  if (!order) return next(new ErrorHandler(400, "Order not found"));

  res.status(200).json({
    success: true,
    data: order,
  });
};

export const createOrder = async (
  req: Request<{}, {}, NewOrderRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const {
    shippingInfo,
    user,
    subTotal,
    shippingCharges,
    tax,
    discount,
    total,
    orderItems,
  } = req.body;

  if (!shippingInfo || !user || !subTotal || !tax || !total || !orderItems)
    return next(new ErrorHandler(400, "Please fill all required fields!"));
  const newOrder = await Order.create({
    shippingInfo,
    user,
    subTotal,
    shippingCharges,
    tax,
    discount,
    total,
    orderItems,
  });

  await reduceStock(orderItems);
  await revalidatesCache({ product: true, order: true, admin: true });

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    data: newOrder,
  });
};

export const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const order = await Order.findById(id);
  if (!order) return next(new ErrorHandler(404, "Order not found"));

  switch (order.status) {
    case "Processing":
      order.status = "Confirmed";
      break;
    case "Confirmed":
      order.status = "Shipping";
      break;
    case "Shipping":
      order.status = "Delivered";
      break;
    default:
      order.status = "Delivered";
      break;
  }
  const updatedOrder = await order.save();

  revalidatesCache({ product: false, order: true, admin: true });

  res.status(200).json({
    success: true,
    massage: "Order upadated successfully!",
    data: updatedOrder,
  });
};

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const order = await Order.findById(id);
  if (!order) return next(new ErrorHandler(404, "Order not found"));

  await order.deleteOne();

  revalidatesCache({ product: false, order: true, admin: true });

  res.status(200).json({
    success: true,
    massage: "Order deleted successfully!",
    data: order,
  });
};
