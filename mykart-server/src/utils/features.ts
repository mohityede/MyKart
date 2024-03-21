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
