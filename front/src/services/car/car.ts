import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "../../env";
import { ApiResponse } from "../../types";

export const carApi = createApi({
    reducerPath: "carApi",
    baseQuery: fetchBaseQuery({baseUrl: env.apiUrl}),
    tagTypes: ["Car"],
    endpoints: (builder) => ({
        createCar: builder.mutation<ApiResponse<null>, FormData>({
            query: (data) => ({
                url: "car",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Car"]
        })
    })
})

export const { useCreateCarMutation } = carApi;