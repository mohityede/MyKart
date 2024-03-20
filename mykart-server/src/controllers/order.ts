import { NextFunction, Request, Response } from "express";

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(200).json({ success: true, data: `order` });
};
