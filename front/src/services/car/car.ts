import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "../../env";
import { ApiResponse } from "../../types";
import { ListParams, ListResponse } from "./types";

export const carApi = createApi({
    reducerPath: "carApi",
    baseQuery: fetchBaseQuery({ baseUrl: env.apiUrl }),
    tagTypes: ["Car"],
    endpoints: (builder) => ({
        getCars: builder.query<ApiResponse<ListResponse>, ListParams>({
            query: (params) => ({
                url: "car/list",
                params: params,
            }),
            providesTags: ["Car"],
        }),
        createCar: builder.mutation<ApiResponse<null>, FormData>({
            query: (data) => ({
                url: "car",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Car"],
        }),
        deleteCar: builder.mutation<ApiResponse<null>, >
    }),
});

export const { useCreateCarMutation, useGetCarsQuery } = carApi;
