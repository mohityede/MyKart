export type User = {
  _id: string;
  name: string;
  email: string;
  photo: string;
  gender: string;
  dob: string;
  role: string;
};

export type Product = {
  _id: string;
  name: string;
  photo: string;
  price: number;
  stock: number;
  category: string;
};

export type ShippingInfo = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: number;
};

export type CartItem = {
  productId: string;
  name: string;
  photo: string;
  price: number;
  quantity: number;
  stock: number;
};

export type OrderItem = Omit<CartItem, "stock"> & { _id: string };

export type Order = {
  _id: string;
  shippingInfo: ShippingInfo;
  userId: string;
  subTotal: number;
  tax: number;
  discount: number;
  total: number;
  status: string;
  quantity: number;
  orderItems: OrderItem[];
};
