import { BrowserRouter, Route } from "react-router-dom";
import React from "react";

// layouts
import Home from "./layout/home/Home";
import Users from "./layout/users/Users";
import Login from "./layout/auth/Login";

// components
import Navbar from "./components/navbar/Navbar";

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/users/:userId?" component={Users} />
        </BrowserRouter>
    );
}
