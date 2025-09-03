import {configureStore} from "@reduxjs/toolkit";
import {userAuthApi} from "../services/UserAuthApi.jsx";
import {userService} from "../services/UserService.jsx";
import {cloudinaryService} from "../services/CloudinaryService.jsx";

export const store = configureStore({
    reducer: {
        [userAuthApi.reducerPath]: userAuthApi.reducer,
        [userService.reducerPath]: userService.reducer,
        [cloudinaryService.reducerPath]: cloudinaryService.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            userAuthApi.middleware,
            userService.middleware,
            cloudinaryService.middleware,
        )
})