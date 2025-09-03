import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const cloudinaryService = createApi({
    resource: "cloudinary",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.cloudinary.com/v1_1/emmastonecode"
    }),
    endpoints: (builder) => ({
        cloudinaryCall: builder.mutation({
            query: (data) => ({
                url: "/image/upload",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data
            })
        })

    })
})

export const {useCloudinaryCallMutation} = cloudinaryService;