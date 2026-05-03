import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../axios/axiosFetch";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery({
        baseUrl: "https://elegatic-api-2lya.vercel.app/api/v1",
    }),
    tagTypes: ["Category"],
    endpoints: (builder) => ({}),
});
