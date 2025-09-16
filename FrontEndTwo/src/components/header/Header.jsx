import React from "react";
import { Link } from "react-router";
import './Header.modules.css'

const Header = () => {
    return (
        <header>
            <p>StoneCodeAuctionApp</p>
            <nav>
                <Link to="/home">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/login">Login</Link>
            </nav>
        </header>
    );
};

export default Header;
