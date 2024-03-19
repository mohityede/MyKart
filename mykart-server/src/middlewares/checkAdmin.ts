import { NextFunction, Request, Response } from "express";
import User from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  if (!id) return next(new ErrorHandler(401, "Please login!"));

  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler(400, "User Not exits!"));

  if (user.role !== "admin")
    return next(new ErrorHandler(401, "You don't have Admin access"));
  next();
};

export default isAdmin;
