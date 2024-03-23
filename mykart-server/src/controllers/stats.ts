import { NextFunction, Request, Response } from "express";
import { appCache } from "../app.js";
import Product from "../models/product.js";
import User from "../models/user.js";
import Order from "../models/order.js";
import { calculateGrowthPercentage } from "../utils/features.js";

export const getDashboardStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let stats = {};

  if (appCache.has("adminStats"))
    stats = JSON.parse(appCache.get("adminStats") as string);
  else {
    const today = new Date();
    const thisMonth = {
      start: new Date(today.getFullYear(), today.getMonth(), 1),
      end: today,
    };
    const lastMonth = {
      start: new Date(today.getFullYear(), today.getMonth() - 1, 0),
      end: new Date(today.getFullYear(), today.getMonth(), 0),
    };
    const thisMonthProductsPromise = Product.find({
      createdAt: {
        $gte: thisMonth.start,
        $lte: thisMonth.end,
      },
    });
    const lastMonthProductsPromise = Product.find({
      createdAt: {
        $gte: lastMonth.start,
        $lte: lastMonth.end,
      },
    });
    const thisMonthUsersPromise = User.find({
      createdAt: {
        $gte: thisMonth.start,
        $lte: thisMonth.end,
      },
    });
    const lastMonthUsersPromise = User.find({
      createdAt: {
        $gte: lastMonth.start,
        $lte: lastMonth.end,
      },
    });
    const thisMonthOrdersPromise = Order.find({
      createdAt: {
        $gte: thisMonth.start,
        $lte: thisMonth.end,
      },
    });
    const lastMonthOrdersPromise = Order.find({
      createdAt: {
        $gte: lastMonth.start,
        $lte: lastMonth.end,
      },
    });

    const [
      thisMonthProducts,
      lastMonthProducts,
      thisMonthUsers,
      lastMonthUsers,
      thisMonthOrders,
      lastMonthOrders,
      productsCount,
      usersCount,
      allOrders,
    ] = await Promise.all([
      thisMonthProductsPromise,
      lastMonthProductsPromise,
      thisMonthUsersPromise,
      lastMonthUsersPromise,
      thisMonthOrdersPromise,
      lastMonthOrdersPromise,
      Product.countDocuments(),
      User.countDocuments(),
      Order.find({}).select("total"),
    ]);

    const thisMonthRevenue = thisMonthOrders.reduce(
      (total, order) => total + (order.total || 0),
      0
    );
    const lastMonthRevenue = lastMonthOrders.reduce(
      (total, order) => total + (order.total || 0),
      0
    );

    const growthPercentage = {
      revenue: calculateGrowthPercentage(lastMonthRevenue, thisMonthRevenue),
      products: calculateGrowthPercentage(
        lastMonthProducts.length,
        thisMonthProducts.length
      ),
      users: calculateGrowthPercentage(
        lastMonthUsers.length,
        thisMonthUsers.length
      ),
      orders: calculateGrowthPercentage(
        lastMonthOrders.length,
        thisMonthOrders.length
      ),
    };

    const revenue = allOrders.reduce(
      (total, order) => total + (order.total || 0),
      0
    );

    const counts = {
      totalRevenue: revenue,
      product: productsCount,
      user: usersCount,
      order: allOrders.length,
    };

    stats = {
      growthPercentage,
      counts,
    };
  }

  return res.status(200).json({
    success: true,
    data: stats,
  });
};

export const getPieChartStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const getBarChartStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const getLineChartStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
