import {
  CartItem,
  Order,
  OrderItem,
  Product,
  ShippingInfo,
  User,
} from "./types";

export interface MassageResponse {
  success: boolean;
  massage: string;
  data: Object;
}

export interface GetUserResponse {
  success: boolean;
  data: User;
}

export interface GetProductsResponse {
  success: boolean;
  data: Product[];
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

export interface NewOrderRequest {
  shippingInfo: ShippingInfo;
  user: string;
  subTotal: number;
  shippingCharges: number;
  tax: number;
  discount: number;
  total: number;
  orderItems: CartItem[];
}

export interface GetMyOrders {
  success: boolean;
  data: Order[];
}
