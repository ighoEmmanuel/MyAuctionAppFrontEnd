import {configureStore} from "@reduxjs/toolkit";
import {userAuthApi} from "../services/UserAuthApi.jsx";
import {bidderApi} from "../services/BidderApi.jsx";

export const store = configureStore({
    reducer: {
        [userAuthApi.reducerPath]: userAuthApi.reducer,
        [bidderApi.reducerPath]: bidderApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            userAuthApi.middleware,
            bidderApi.middleware
        )
})