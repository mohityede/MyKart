import morgan from "morgan";
import Stripe from "stripe";
import dotenv from "dotenv";
import express from "express";
import NodeCache from "node-cache";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";

import connectDB from "./utils/connectDB.js";
import errorMiddleware from "./middlewares/error.js";
import userRoutes from "./routes/user.js";
import statsRoutes from "./routes/stats.js";
import orderRoutes from "./routes/order.js";
import productRoutes from "./routes/product.js";
import paymentRoutes from "./routes/payment.js";

const app = express();

dotenv.config();
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
})
connectDB();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
export const appCache = new NodeCache();
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/stats", statsRoutes);
// app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`express server is running on https://localhost:${PORT}`);
});
