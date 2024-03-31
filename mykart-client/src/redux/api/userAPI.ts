import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { backendServer } from "../store";
import { MassageResponse } from "../../types/api";
import { User } from "../../types/types";

const backendServer = import.meta.env.VITE_BACKEND_SERVER;

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({ baseUrl: `${backendServer}/api/v1/user/` }),
  endpoints: (builder) => ({
    login: builder.mutation<MassageResponse, User>({
      query: (user) => ({ url: "new", method: "POST", body: user }),
    }),
  }),
});

export const { useLoginMutation } = userAPI;
