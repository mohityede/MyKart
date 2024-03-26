import { NextFunction, Request, Response } from "express";

import ErrorHandler from "../utils/errorHandler.js";

const errorMiddleware = (
  error: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  error.message = error.message || "Internal server issue";
  error.statusCode = error.statusCode || 500;

  if (error.name == "CastError") error.message = "Invalid ID";
  return res.status(error.statusCode).json({
    success: false,
    massage: `SERVER ERROR: ${error.message}`,
    errorDetails: error,
  });
};

export default errorMiddleware;
