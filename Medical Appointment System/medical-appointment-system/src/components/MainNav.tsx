import React from "react";
import {  Link } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";

function MainNav() {
    return (
            //<div className="bg-img">
                <nav className="nav">
                    <div className="nav-container">
                        <ul className="nav-links">
                            <li ><Link to="/">Home</Link></li>
                            <li ><Link to="/about">Services</Link></li>
                            <li ><Link to="/contact-us">Contact Us</Link></li>
                        </ul>
                    </div>
                    <button className="btn btn-main"><Link to="/login">Login</Link></button>
                </nav>
            //</div>
            
    )
}
export default MainNav;


