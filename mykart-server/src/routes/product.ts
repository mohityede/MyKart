import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getLatestProducts,
  getProduct,
  searchProduct,
  updateProduct,
} from "../controllers/product.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import isAdmin from "../middlewares/checkAdmin.js";
import { singleFileUpload } from "../middlewares/multer.js";

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
  // asyncWrapper(isAdmin),
  singleFileUpload,
  asyncWrapper(createProduct)
);

// update product details - PUT /api/v1/product/:id
router.put(
  "/:id",
  asyncWrapper(isAdmin),
  singleFileUpload,
  asyncWrapper(updateProduct)
);

// delete user - DELETE /api/v1/product/:id
router.delete("/:id", asyncWrapper(isAdmin), asyncWrapper(deleteProduct));

export default router;
