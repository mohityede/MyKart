import { Router } from "express";

import isAdmin from "../middlewares/checkAdmin.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getLatestProducts,
  getProduct,
  searchProduct,
  updateProduct,
} from "../controllers/product.js";
// import { singleFileUpload } from "../middlewares/multer.js";
import upload from "../middlewares/multer.js";

const router = Router();

// get all user - GET /api/v1/product/all
router.get("/all", asyncWrapper(getAllProducts));
// get latest products - GET /api/v1/product/latest
router.get("/latest", asyncWrapper(getLatestProducts));
// get search/filtered products - GET /api/v1/product/latest
router.get("/search", asyncWrapper(searchProduct));
// get user by id - GET /api/v1/product/:id
router.get("/:id", asyncWrapper(getProduct));

// create new product - POST /api/v1/product/new
router.post(
  "/new",
  asyncWrapper(isAdmin),
  upload,
  asyncWrapper(createProduct)
);

// update product details - PUT /api/v1/product/:id
router.put(
  "/:id",
  asyncWrapper(isAdmin),
  upload,
  asyncWrapper(updateProduct)
);

// delete product - DELETE /api/v1/product/:id
router.delete("/:id", asyncWrapper(isAdmin), asyncWrapper(deleteProduct));

export default router;
