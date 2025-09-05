import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
const url  = "https://auctionappbackend-ef0f.onrender.com/api"


export const userService = createApi({
    reducerPath: 'userService',
    baseQuery: fetchBaseQuery({
        baseUrl:`${url}`
    }),
    endpoints: (builder) => ({
        getAvailableProducts: builder.query({
            query:()=>( {
                url: "/viewAllProducts",
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }),

        auctionProduct: builder.mutation({
            query:(data)=>( {
                url: "/addProduct",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data
            })
        }),

        placeBid: builder.mutation({
            query:(data)=>( {
                url: "/bid",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data
            })
        })
    })

})

//
export const {useGetAvailableProductsQuery,useAuctionProductMutation,usePlaceBidMutation} = userService