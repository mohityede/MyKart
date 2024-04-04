import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetProductsResponse,
  SearchProductResponse,
  SearchProductRequest,
} from "../../types/api";

const backendUserUrl = `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/product/`;

export const productAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: fetchBaseQuery({ baseUrl: backendUserUrl }),
  endpoints: (builder) => ({
    latestProducts: builder.query<GetProductsResponse, string>({
      query: () => "latest",
    }),
    allProducts: builder.query<GetProductsResponse, string>({
      query: () => "all",
    }),
    searchProducts: builder.query<SearchProductResponse, SearchProductRequest>({
      query: ({ price, search, sort, category, page }) => {
        let base = `search?page=${page}&search=${search}`;
        if (price) base += `&price=${price}`;
        if (sort) base += `&sort=${sort}`;
        if (category) base += `&category=${category}`;
        return base;
      },
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useSearchProductsQuery,
} = productAPI;
