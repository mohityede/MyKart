import { NextFunction, Request, Response } from "express";
import User from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await User.find();
  return res.status(200).json({ success: true, data: users });
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler(400, "invalid id!"));

  return res.status(200).json({ success: true, data: user });
};

export const createUser = async (
  req: Request<{}, {}, NewUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const { _id, name, email, photo, gender, dob } = req.body;
  let user = await User.findById(_id);
  if (user)
    return res
      .status(200)
      .json({ success: true, massage: `Welcome ${user.name}` });

  if (!name || !email || !photo || !gender || !dob)
    return next(new ErrorHandler(400, "Please fill all fuild!"));

  user = await User.create({
    _id,
    name,
    email,
    photo,
    gender,
    dob: new Date(dob),
  });
  return res
    .status(201)
    .json({ success: true, massage: `Welcome ${user.name}`, data: user });
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler(400, "invalid id!"));

  await User.findByIdAndDelete(id);

  return res
    .status(200)
    .json({ success: true, data: `${user.name} deleted successfully` });
};
