import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/user";
import { userReducer } from "./reducers/userReducer";
import { productAPI } from "./api/product";
import { cartReducer } from "./reducers/cartReducer";
import { orderApi } from "./api/order";

// export const backendServer = import.meta.env.VITE_BACKEND_SERVER;

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [userReducer.name]: userReducer.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [cartReducer.name]: cartReducer.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (middle) =>
    middle().concat(
      userAPI.middleware,
      productAPI.middleware,
      orderApi.middleware
    ),
});
