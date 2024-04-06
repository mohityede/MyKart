import { configureStore } from "@reduxjs/toolkit";

import { userAPI } from "./api/user";
import { orderApi } from "./api/order";
import { productAPI } from "./api/product";
import { userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";

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
