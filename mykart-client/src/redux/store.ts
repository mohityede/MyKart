import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userAPI";

// export const backendServer = import.meta.env.VITE_BACKEND_SERVER;

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
  },
  middleware: (middle) => middle().concat(userAPI.middleware),
});
