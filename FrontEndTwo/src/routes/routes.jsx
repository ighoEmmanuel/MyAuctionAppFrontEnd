import { createBrowserRouter } from "react-router";
import Layout from "../components/layout/Layout";
import SignUp from "../components/auth/signUp/SignUp";
import Login from "../components/auth/login/Login";
import HomePage from "../components/homePage/HomePage.jsx";
import DashBoard from "../components/dashBoards/DashBoard.jsx";
import AuctionPage from "../components/dashBoards/AuctionPage.jsx";

const router = createBrowserRouter([


    {path:'/home',
        element: <HomePage />,
    },

    {
        path: "/",
        element: <Login/>,
    },


    {
        path: "/signup",
        element: <SignUp />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/dashboard",
        element: <DashBoard/>
    },
    {
        path: "/auction",
        element: <AuctionPage/>,
    }

]);

export default router;
