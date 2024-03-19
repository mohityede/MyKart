import { NextFunction, Request, Response } from "express";

export type ContollerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

export type FindQuery = {
  name?: {
    $regex: string;
    $options: string;
  };
  price?: { $lte: number };
  category?: string;
};

export type revalidateCacheProps = {
  product?: boolean;
  order?: boolean;
  admin?: boolean;
};
