import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetMyOrders, MassageResponse, NewOrderRequest } from "../../types/api";

const backendOrderUrl = `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/order/`;

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: backendOrderUrl }),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation<MassageResponse, NewOrderRequest>({
      query: (order) => ({ url: "new", method: "POST", body: order }),
      invalidatesTags: ["orders"],
    }),
    myOrders: builder.query<GetMyOrders, string>({
      query: (userId) => ({ url: `my?id=${userId}` }),
      providesTags: ["orders"],
    }),
  }),
});

export const { useCreateOrderMutation, useMyOrdersQuery } = orderApi;
