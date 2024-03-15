import express from "express";
import userRoutes from "./routes/user.js";

const app = express();

app.use("/api/v1/user", userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`express server is running on https://localhost:${PORT}`);
});
