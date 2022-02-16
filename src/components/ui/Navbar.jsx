import { NavLink } from "react-router-dom";
import React from "react";

// styles
import "./Navbar.css";
import { useAuth } from "src/hooks/useAuth";
import NavProfile from "./NavProfile";

export default function Navbar() {
    const { currentUser } = useAuth();

    return (
        <nav
            className="navbar justify-content-start py-0 navbar-light mb-4"
            style={{ backgroundColor: "#e3f2fd" }}
        >
            <div className="container-fluid">
                <ul className="nav gap-4">
                    <li>
                        <NavLink
                            className="p-3 d-block text-decoration-none text-black"
                            to="/"
                        >
                            Home
                        </NavLink>
                    </li>
                    {currentUser && (
                        <li>
                            <NavLink
                                className="p-3 d-block text-decoration-none text-black"
                                to="/users"
                            >
                                Users
                            </NavLink>
                        </li>
                    )}
                </ul>
                <div className="d-flex">
                    {currentUser ? (
                        <NavProfile user={currentUser} />
                    ) : (
                        <NavLink
                            className="p-3 d-block text-decoration-none text-black"
                            to="/login"
                        >
                            Login
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
}
