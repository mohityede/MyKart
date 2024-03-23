import Product from "../models/product.js";
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
) => {
  if (lastMonth == 0) return (thisMonth / 100).toFixed(0);
  const percent = ((thisMonth - lastMonth) / lastMonth) * 100;
  return Number(percent.toFixed(0));
};
