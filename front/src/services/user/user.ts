import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "../../types";
import { User } from "./types";
import { env } from "../../env";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: env.apiUrl }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        getUsers: builder.query<ApiResponse<User[]>, void>({
            query: () => "user",
            providesTags: ["User"],
        }),
        deleteUser: builder.mutation<ApiResponse<null>, string>({
            query: (id) => ({
                url: "user",
                method: "DELETE",
                params: { id },
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const { useGetUsersQuery, useDeleteUserMutation } = userApi;
