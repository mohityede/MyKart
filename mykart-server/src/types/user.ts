import { NextFunction, Request, Response } from "express";

export interface NewUserRequestBody {
  _id: string;
  name: string;
  email: string;
  photo: string;
  gender: string;
  dob: Date;
}

export type ContollerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;
