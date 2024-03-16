import express from "express";
import userRoutes from "./routes/user.js";
import dotenv from "dotenv";
import connectDB from "./utils/connectDB.js";

dotenv.config();

connectDB();
const app = express();

app.use("/api/v1/user", userRoutes);

const PORT = process.env.PORT || 4000;
// console.log(process.env.MONGODB_CONNECTION_STRING);
app.listen(PORT, () => {
  console.log(`express server is running on https://localhost:${PORT}`);
});
