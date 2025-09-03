import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const url  = "https://auctionappbackend-ef0f.onrender.com/api"

export const userAuthApi = createApi({
    reducerPath: 'userAuthApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${url}`
    }),
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (data) => ({
                url: "/register/user",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data
            })
        }),


        login: builder.mutation({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data
            })
        })


    })
})

export const {useSignUpMutation,useLoginMutation} = userAuthApi