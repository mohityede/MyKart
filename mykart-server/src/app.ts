import express from "express";
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import orderRoutes from "./routes/order.js";
import dotenv from "dotenv";
import connectDB from "./utils/connectDB.js";
import errorMiddleware from "./middlewares/error.js";
import NodeCache from "node-cache";
import morgan from "morgan";

const app = express();

dotenv.config();
connectDB();
app.use(express.json());
app.use(morgan("dev"));
export const appCache = new NodeCache();

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`express server is running on https://localhost:${PORT}`);
});
