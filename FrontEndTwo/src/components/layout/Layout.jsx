// src/layout/Layout.jsx
import React from "react";
import Header from "../header/Header.jsx";
import { Outlet } from "react-router";

const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
