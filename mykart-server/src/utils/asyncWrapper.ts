import { NextFunction, Request, Response } from "express";
import { ContollerType } from "../types/user.js";

const asyncWrapper = (func: ContollerType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req, res, next)).catch(next);
  };
};

export default asyncWrapper;
