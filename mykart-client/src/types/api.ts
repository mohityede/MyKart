import { Product, User } from "./types";

export interface MassageResponse {
  success: boolean;
  massage: string;
  data: User;
}

export interface GetUserResponse {
  success: boolean;
  data: User;
}

export interface GetProductsResponse {
  success: boolean;
  data: Product[];
}
