import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
const url  = "http://localhost:8080/api"


export const bidderApi = createApi({
    reducerPath: 'bidderApi',
    baseQuery: fetchBaseQuery({
        baseUrl:`${url}`
    }),
    endpoints: (builder) => ({
        getAvailableProducts: builder.query({
            query: {
                url: "/viewAllProducts",
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        })
    })

})

//
export const {useGetAvailableProductsQuery} = bidderApi