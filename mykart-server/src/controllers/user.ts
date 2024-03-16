import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { newUserRequestBody } from "../types/user.js";

export const createUser = async (
  req: Request<{}, {}, newUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, photo, gender, role, dob } = req.body;
    const user = await User.create({ name, email, photo, gender, role, dob });
    return res
      .status(200)
      .json({ success: true, massage: `Welcome ${user.name}` });
  } catch (error) {
    return res
      .status(500)
      .json({ success: true, massage: `SERVER ERROR: ${error}` });
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ success: true, massage: `Hello User` });
  } catch (error) {}
};
