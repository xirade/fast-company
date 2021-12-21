import { NavLink } from "react-router-dom";
import React from "react";

// styles
import "./Navbar.css"

export default function Navbar() {
    return (
        <nav
            className="navbar justify-content-start py-0 navbar-light mb-4"
            style={{ backgroundColor: "#e3f2fd" }}
        >
            <ul className="nav gap-4">
                <li>
                    <NavLink className="p-3 d-block text-decoration-none text-black" to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink className="p-3 d-block text-decoration-none text-black" to="/login">Login</NavLink>
                </li>
                <li>
                    <NavLink className="p-3 d-block text-decoration-none text-black" to="/users">Users</NavLink>
                </li>
            </ul>
        </nav>
    );
}
