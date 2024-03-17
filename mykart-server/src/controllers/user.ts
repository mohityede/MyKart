import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/user.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createUser = async (
  req: Request<{}, {}, NewUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, photo, gender, role, dob } = req.body;
    const user = await User.create({
      name,
      email,
      photo,
      gender,
      role,
      dob: new Date(dob),
    });
    return res
      .status(201)
      .json({ success: true, massage: `Welcome ${user.name}`, data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, massage: `SERVER ERROR: ${error}` });
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // return res.status(200).json({ success: true, massage: `Hello User` });
    throw new ErrorHandler(402, "pyment wala err");
  } catch (error) {
    return next(error);
  }
};
