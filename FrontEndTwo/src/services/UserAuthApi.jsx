import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const url  = "http://localhost:8080/api"

export const userAuthApi = createApi({
    reducerPath: 'userAuthApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${url}`
    }),
    endpoints: (builder) => ({
        signUpBidder: builder.mutation({
            query: (data) => ({
                url: "/register/bidder",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data
            })
        }),

        signUpSeller: builder.mutation({
            query: (data) => ({
                url: "/register/seller",
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

export const {useSignUpBidderMutation,useSignUpSellerMutation,useLoginMutation} = userAuthApi