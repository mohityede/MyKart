import { ReactElement } from "react";
import { CartItem, User } from "./types";

export interface HeaderProps {
  user: User | null;
}

export interface ProtectedProps {
  isAuthenticated: boolean;
  isAdmin?: boolean;
  isAdminRoute?: boolean;
  children?: ReactElement;
  redirect?: string;
}

export interface ProductProps {
  productId: string;
  name: string;
  photo: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => void;
}

export interface ItemProps {
  cartItem: CartItem;
  incrementCartItemQuantity: (cartItem: CartItem) => void;
  decrementCartItemQuantity: (cartItem: CartItem) => void;
  deleteCartItem: (id: string) => void;
}
