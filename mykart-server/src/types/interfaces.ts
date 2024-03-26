import { OrderItemType, ShippingInfoType } from "./types.js";

export interface NewUserRequestBody {
  _id: string;
  name: string;
  email: string;
  photo: string;
  gender: string;
  dob: Date;
}

export interface NewProductRequestBody {
  name: string;
  photo: string;
  price: number;
  stock: number;
  category: string;
}

export interface SearchProductRequestQuery {
  search?: string;
  price?: string;
  category?: string;
  sort?: string;
  page?: string;
}

export interface NewOrderRequestBody {
  shippingInfo: ShippingInfoType;
  user: String;
  subTotal: Number;
  shippingCharges: Number;
  tax: Number;
  discount: Number;
  total: Number;
  orderItems: OrderItemType[];
}

export interface MyDocument extends Document {
  createdAt: Date;
  discount?: number;
  total?: number;
}
