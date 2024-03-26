import { NextFunction, Request, Response } from "express";
import { appCache } from "../app.js";
import Product from "../models/product.js";
import User from "../models/user.js";
import Order from "../models/order.js";
import {
  calculateGrowthPercentage,
  getCategoryWisePercent,
  getChartData,
} from "../utils/features.js";
import { stat } from "fs";
import { MyDocument } from "../types/interfaces.js";

export const getDashboardStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let stats = {};

  if (appCache.has("dashboardStats"))
    stats = JSON.parse(appCache.get("dashboardStats") as string);
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
    const sixMonthAgo = new Date();
    sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);

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
    const lastSixMonthOrderPromise = Order.find({
      createdAt: { $gte: sixMonthAgo, $lte: today },
    });
    const latestTransectionPromise = Order.find({})
      .select(["orderItems", "discount", "total", "status"])
      .limit(5);

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
      lastSixMonthOrders,
      categories,
      latestTransections,
      femaleUserCount,
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
      lastSixMonthOrderPromise,
      Product.distinct("category"),
      latestTransectionPromise,
      User.countDocuments({ gender: "female" }),
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

    const orderMonthlyCounts = new Array(6).fill(0);
    const orderMonthlyRevenue = new Array(6).fill(0);

    lastSixMonthOrders.forEach((order) => {
      const monthDiff = today.getMonth() - order.createdAt.getMonth();
      if (monthDiff > 6) {
        orderMonthlyCounts[6 - monthDiff - 1] += 1;
        orderMonthlyRevenue[6 - monthDiff - 1] += order.total;
      }
    });

    const genderRatio = {
      male: usersCount - femaleUserCount,
      female: femaleUserCount,
    };

    const newLatestTransections = latestTransections.map((order) => ({
      _id: order._id,
      discount: order.discount,
      amount: order.total,
      quantity: order.orderItems.length,
      status: order.status,
    }));

    const categoryCountPercent = await getCategoryWisePercent(
      categories,
      productsCount
    );

    stats = {
      growthPercentage,
      counts,
      categoryCountPercent,
      genderRatio,
      lastestTransections: newLatestTransections,
      chart: { orderCount: orderMonthlyCounts, revenue: orderMonthlyRevenue },
    };

    appCache.set("dashboardStats", JSON.stringify(stats));
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
) => {
  let charts;
  if (appCache.has("dashboardPieCharts"))
    JSON.parse(appCache.get("dashboardPieCharts") as string);
  else {
    const allProductsPromise = Order.find({}).select([
      "total",
      "discount",
      "subTotal",
      "tax",
      "shippingCharges",
    ]);
    const [
      processingOrders,
      confirmedOrders,
      shippingOrders,
      deliveredOrders,
      categories,
      allProductsCount,
      outOfStocksProductsCount,
      allOrders,
      allUsers,
    ] = await Promise.all([
      Order.countDocuments({ status: "Processing" }),
      Order.countDocuments({ status: "Confirmed" }),
      Order.countDocuments({ status: "Shipping" }),
      Order.countDocuments({ status: "Delivered" }),
      Product.distinct("category"),
      Product.countDocuments(),
      Product.countDocuments({ stock: 0 }),
      allProductsPromise,
      User.find({}).select(["role", "dob", "age"]),
    ]);
    const ordersFullFillment = {
      processingOrders,
      confirmedOrders,
      shippingOrders,
      deliveredOrders,
    };
    const categoryCountPercent = await getCategoryWisePercent(
      categories as string[],
      allProductsCount
    );
    const stocksAvailable = {
      inStock: allProductsCount - outOfStocksProductsCount,
      outOfStock: outOfStocksProductsCount,
    };
    const grossIncome = allOrders.reduce(
      (total, currOrder) => total + (currOrder.total || 0),
      0
    );
    const discount = allOrders.reduce(
      (total, currOrder) => total + (currOrder.discount || 0),
      0
    );
    const transport = allOrders.reduce(
      (total, currOrder) => total + (currOrder.shippingCharges || 0),
      0
    );
    const taxed = allOrders.reduce(
      (total, currOrder) => total + (currOrder.tax || 0),
      0
    );
    const marketingCost = Math.round(grossIncome * (15 / 100));
    const netMargin =
      grossIncome - discount - transport - taxed - marketingCost;
    const revenueDistribution = {
      grossIncome,
      discount,
      transport,
      taxed,
      marketingCost,
      netMargin,
    };
    const UserAgeGroups = {
      teen: allUsers.filter((i) => i.age < 18).length,
      adult: allUsers.filter((i) => i.age >= 18 && i.age < 45).length,
      old: allUsers.filter((i) => i.age >= 45).length,
    };
    const adminCustomer = {
      admin: allUsers.filter((i) => i.role === "admin").length,
      customer: allUsers.filter((i) => i.role === "user").length,
    };
    charts = {
      ordersFullFillment,
      categoryCountPercent,
      stocksAvailable,
      revenueDistribution,
      UserAgeGroups,
      adminCustomer,
    };
    appCache.set("dashboardPieCharts", JSON.stringify(charts));
  }
  res.status(200).json({
    success: true,
    data: charts,
  });
};

export const getBarChartStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let charts;

  if (appCache.has("dashboardBarChart"))
    charts = JSON.parse(appCache.get("dashboardBarChart") as string);
  else {
    const today = new Date();

    const sixMonthAgo = new Date();
    sixMonthAgo.setMonth(today.getMonth() - 6);
    const twelveMonthAgo = new Date();
    twelveMonthAgo.setMonth(today.getMonth() - 12);

    const sixMonthProductsPromise = Product.find({
      createdAt: {
        $gte: sixMonthAgo,
        $lte: today,
      },
    }).select("createdAt");

    const sixMonthUsersPromise = User.find({
      createdAt: {
        $gte: sixMonthAgo,
        $lte: today,
      },
    }).select("createdAt");

    const twelveMonthOrdersPromise = Order.find({
      createdAt: {
        $gte: twelveMonthAgo,
        $lte: today,
      },
    }).select("createdAt");

    const [sixMonthProducts, sixMonthUsers, twelveMonthOrders] =
      await Promise.all([
        sixMonthProductsPromise,
        sixMonthUsersPromise,
        twelveMonthOrdersPromise,
      ]);

    const productsCount = getChartData(6, sixMonthProducts as any);
    const usersCount = getChartData(6, sixMonthUsers);
    const ordersCount = getChartData(12, twelveMonthOrders as any);

    charts = {
      productsCount,
      usersCount,
      ordersCount,
    };

    appCache.set("dashboardBarChart", JSON.stringify(charts));
  }

  res.status(200).json({
    sucess: true,
    data: charts,
  });
};

export const getLineChartStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let charts;

  if (appCache.has("dashboardLineChart"))
    charts = JSON.parse(appCache.get("dashboardLineChart") as string);
  else {
    const today = new Date();

    const twelveMonthAgo = new Date();
    twelveMonthAgo.setMonth(today.getMonth() - 12);

    const baseQuery = {
      createdAt: {
        $gte: twelveMonthAgo,
        $lte: today,
      },
    };

    const [products, users, orders] = await Promise.all([
      Product.find(baseQuery).select("createdAt"),
      User.find(baseQuery).select("createdAt"),
      Order.find(baseQuery).select(["createdAt", "discount", "total"]),
    ]);

    const productsCount = getChartData(12, products as any);
    const usersCount = getChartData(12, users);
    const discount = getChartData(12, orders as any, "discount");
    const revenue = getChartData(12, orders as any, "total");

    charts = {
      productsCount,
      usersCount,
      discount,
      revenue,
    };
    appCache.set("dashboardLineChart", JSON.stringify(charts));
  }

  res.status(200).json({
    sucess: true,
    data: charts,
  });
};
