import express from "express";
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import dotenv from "dotenv";
import connectDB from "./utils/connectDB.js";
import errorMiddleware from "./middlewares/error.js";
import NodeCache from "node-cache";

const app = express();

dotenv.config();
app.use(express.json());

connectDB();
export const appCache = new NodeCache();

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;
// console.log(process.env.MONGODB_CONNECTION_STRING);
app.listen(PORT, () => {
  console.log(`express server is running on https://localhost:${PORT}`);
});
