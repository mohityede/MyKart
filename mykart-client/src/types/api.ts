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

interface SearchData {
  products: Product[];
  filteredProductsOnly: Product[];
  totalPages: number;
}
export interface SearchProductResponse {
  success: boolean;
  data: {
    products: Product[];
    filteredProductsOnly: Product[];
    totalPages: number;
  };
}

export interface SearchProductRequest {
  search: string;
  sort: string;
  price: number;
  category: string;
  page: number;
}
