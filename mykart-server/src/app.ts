import express from "express";
import userRoutes from "./routes/user.js";
import dotenv from "dotenv";
import connectDB from "./utils/connectDB.js";
import errorMiddleware from "./middlewares/error.js";

const app = express();

dotenv.config();
app.use(express.json());

connectDB();

app.use("/api/v1/user", userRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;
// console.log(process.env.MONGODB_CONNECTION_STRING);
app.listen(PORT, () => {
  console.log(`express server is running on https://localhost:${PORT}`);
});
