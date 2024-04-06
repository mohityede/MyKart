import axios from "axios";
import toast from "react-hot-toast";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { User } from "../../types/types";
import { GetUserResponse, MassageResponse } from "../../types/api";

const backendUserUrl = `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/user/`;

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({ baseUrl: backendUserUrl }),
  endpoints: (builder) => ({
    login: builder.mutation<MassageResponse, User>({
      query: (user) => ({ url: "new", method: "POST", body: user }),
    }),
  }),
});

export const getUser = async (id: string) => {
  try {
    const { data }: { data: GetUserResponse } = await axios.get(
      `${backendUserUrl}${id}`
    );
    return data;
  } catch (error) {
    toast.error("error while fetching user");
  }
};

export const { useLoginMutation } = userAPI;
