import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartReducerInitialState } from "../../types/reducers";
import { CartItem } from "../../types/types";

const initialState: CartReducerInitialState = {
  loading: false,
  cartItems: [],
  subTotal: 0,
  tax: 0,
  shippingCharges: 0,
  discount: 0,
  total: 0,
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: 0,
  },
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.loading = true;
      const ind = state.cartItems.findIndex(
        (i) => i.productId === action.payload.productId
      );
      if (ind !== -1) state.cartItems[ind] = action.payload;
      else state.cartItems.push(action.payload);
      state.loading = false;
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.cartItems = state.cartItems.filter(
        (i) => i.productId !== action.payload
      );
      state.loading = false;
    },
    calculateTotal: (state) => {
      const subtotal = state.cartItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
      state.loading = true;
      state.subTotal = subtotal;
      state.shippingCharges =
        state.subTotal > 1000 || state.subTotal === 0 ? 0 : 200;
      state.tax = Math.round(state.subTotal * 0.18);
      state.total =
        state.subTotal + state.shippingCharges + state.tax - state.discount;
      state.loading = false;
    },
  },
});

export const { addToCart, removeCartItem, calculateTotal } =
  cartReducer.actions;
