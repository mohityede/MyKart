import { NextFunction, Request, Response } from "express";

import Product from "../models/product.js";
import ErrorHandler from "../utils/errorHandler.js";
import revalidatesCache from "../utils/revalidateCache.js";
import {
  NewProductRequestBody,
  SearchProductRequestQuery,
} from "../types/interfaces.js";
import { appCache } from "../app.js";
import { FindQuery, ProductCategory } from "../types/types.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let products: Array<object>;
  if (appCache.has("allProducts"))
    products = appCache.get("allProducts") as Array<object>;
  else {
    products = await Product.find();
    appCache.set("allProducts", products);
  }
  return res.status(200).json({ success: true, data: products });
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) return next(new ErrorHandler(400, "invalid product id!"));

  return res.status(200).json({ success: true, data: product });
};

export const getLatestProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let products;
  if (appCache.has("latestProducts")) products = appCache.get("latestProducts");
  else {
    products = await Product.find({}).sort({ createdAt: -1 }).limit(4);
    if (!products) return next(new ErrorHandler(400, "invalid product id!"));
    appCache.set("latestProducts", products);
  }

  return res.status(200).json({ success: true, data: products });
};

export const searchProduct = async (
  req: Request<{}, {}, {}, SearchProductRequestQuery>,
  res: Response,
  next: NextFunction
) => {
  const { search, sort, category, price } = req.query;
  const page = Number(req.query.page) || 1;
  const pageLimit = Number(process.env.PRODUCT_PER_PAGE) || 8;
  const productsToSkip = (page - 1) * pageLimit;

  const findQuery: FindQuery = {};

  if (search) findQuery.name = { $regex: search as string, $options: "i" };
  if (price) findQuery.price = { $lte: Number(price) };
  if (category) findQuery.category = category;

  const productsPromise = Product.find(findQuery)
    .sort(sort && { price: sort === "asc" ? 1 : -1 })
    .limit(pageLimit)
    .skip(productsToSkip);

  const [filteredProductsOnly, products] = await Promise.all([
    productsPromise,
    Product.find(findQuery),
  ]);

  const totalPages = Math.ceil(products.length / pageLimit);

  return res.status(200).json({
    success: true,
    data: { products, filteredProductsOnly, totalPages },
  });
};

export const createProduct = async (
  req: Request<{}, {}, NewProductRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const { name, price, stock, category } = req.body;
  const photo = req.file;
  if (!name || !price || !stock || !category || !photo) {
    // if (photo) {
    //   rm(photo.path, () => {
    //     console.log("Deleted");
    //   });
    // }
    return next(new ErrorHandler(400, "Please fill all fuild!"));
  }
  const cloudinary_img:any = await uploadToCloudinary(photo.buffer);

  const product = await Product.create({
    name,
    price,
    photo: cloudinary_img?.secure_url,
    stock,
    category: category.toLocaleLowerCase(),
  });

  revalidatesCache({ product: true, admin: true });

  return res.status(201).json({
    success: true,
    message: `${product.name} created successfully!`,
    data: product,
  });
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) return next(new ErrorHandler(400, "invalid product id!"));

  await Product.findByIdAndDelete(id);

  revalidatesCache({ product: true, admin: true });

  return res
    .status(200)
    .json({ success: true, message: `${product.name} deleted successfully` });
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { name, price, stock, category } = req.body;
  const photo = req.file;

  const product = await Product.findById(id);
  if (!product) return next(new ErrorHandler(400, "invalid product!"));
  // if (photo) {
  //   rm(product.photo, () => {
  //     console.log("old photo Deleted");
  //   });
  //   product.photo = photo.path;
  // }
  if(photo){
    const cloudinary_img:any = await uploadToCloudinary(photo?.buffer);
    product.photo=cloudinary_img?.secure_url;
  }
  

  if (name) product.name = name;
  if (price) product.price = price;
  if (stock) product.stock = stock;
  if (category)
    product.category = category.toLocaleLowerCase() as ProductCategory;

  const updatedProduct = await product.save();

  revalidatesCache({ product: true, admin: true });

  return res.status(200).json({
    success: true,
    message: `${product.name} updated successfully`,
    data: updatedProduct,
  });
};
