import { appCache } from "../app.js";
import { revalidateCacheProps } from "../types/types.js";

const revalidatesCache = ({ product, order, admin }: revalidateCacheProps) => {
  if (product) {
    const productKeys: string[] = ["allProducts", "latestProducts"];
    appCache.del(productKeys);
  }
  if (order) {
  }
  if (admin) {
  }
};

export default revalidatesCache;
