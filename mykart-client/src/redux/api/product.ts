import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetProductsResponse } from "../../types/api";

const backendUserUrl = `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/product/`;

export const productAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: fetchBaseQuery({ baseUrl: backendUserUrl }),
  endpoints: (builder) => ({
    latestProducts: builder.query<GetProductsResponse, string>({
      query: () => "latest",
    }),
  }),
});

export const { useLatestProductsQuery } = productAPI;
