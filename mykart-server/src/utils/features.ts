import Product from "../models/product.js";
import { MyDocument } from "../types/interfaces.js";
import { OrderItemType } from "../types/types.js";

export const reduceStock = async (orderItems: OrderItemType[]) => {
  for (let i = 0; i < orderItems.length; i++) {
    let currItem = orderItems[i];
    let product = await Product.findById(currItem.productId);
    if (!product) throw new Error("Product Not Found");

    const orderedQuantity: number = currItem.quantity as number;
    if ((orderedQuantity as number) > product.stock)
      throw new Error(`Only ${product.stock} products available in stock`);
    product.stock -= orderedQuantity as number;
    await product.save();
  }
};

export const calculateGrowthPercentage = (
  lastMonth: number,
  thisMonth: number
): Number => {
  if (lastMonth == 0) return Number((thisMonth / 100).toFixed(0));
  const percent = ((thisMonth - lastMonth) / lastMonth) * 100;
  return Number(percent.toFixed(0));
};

export const getCategoryWisePercent = async (
  categories: string[],
  allProductsCount: number
) => {
  const categoriesCountPromises = categories.map((cat) =>
    Product.countDocuments({ category: cat })
  );
  const categoriesCount = await Promise.all(categoriesCountPromises);
  const categoryCountPercent: Record<string, number>[] = [];
  categories.forEach((cat, i) => {
    categoryCountPercent.push({
      [cat]: Math.round((categoriesCount[i] / allProductsCount) * 100),
    });
  });
  return categoryCountPercent;
};

export const getChartData = (
  length: number,
  docArr: MyDocument[],
  property?: "discount" | "total"
) => {
  const today = new Date();
  const data: number[] = new Array(length).fill(0);
  docArr.forEach((curr) => {
    const monthDiff = (today.getMonth() - curr.createdAt.getMonth() + 12) % 12;
    if (monthDiff < length) {
      data[length - monthDiff - 1] += property ? curr[property]! : 1;
    }
  });
  return data;
};
