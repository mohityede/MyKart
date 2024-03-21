import { appCache } from "../app.js";
import { revalidateCacheProps } from "../types/types.js";

const revalidatesCache = ({ product, order, admin }: revalidateCacheProps) => {
  if (product) {
    const productKeys: string[] = ["allProducts", "latestProducts"];
    appCache.del(productKeys);
  }
  if (order) {
    const orderKeys: string[] = ["allOrders"];
    appCache.del(orderKeys);
  }
  if (admin) {
  }
};

export default revalidatesCache;
