// src/router/index.jsx (or wherever your router is defined)
import { createBrowserRouter } from "react-router";
import Layout from "../components/layout/Layout"; // adjust path
import SignUp from "../components/auth/signUp/SignUp";
import Login from "../components/auth/login/Login";
import HomePage from "../components/homePage/HomePage.jsx";

const router = createBrowserRouter([


    {path:'/home',
        element: <HomePage />,
    },

    {
        path: "/",
        element: <HomePage/>,
    },


    {
        path: "/signup",
        element: <SignUp />,
    },
    {
        path: "/login",
        element: <Login />,
    }


]);

export default router;
