import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

// layouts
import Home from "./layout/home/Home";
import Users from "./layout/users/Users";
import Login from "./layout/auth/Login";

// components
import Navbar from "./components/ui/Navbar";
import UsersEditPage from "./components/page/user-edit-page";
import { ToastContainer } from "react-toastify";
import ProfessionProvider from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQualities";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Route exact path="/" component={Home} />
                <ProfessionProvider>
                    <QualitiesProvider>
                        <Route path="/login:type?" component={Login} />
                        <Route exact path="/users/:userId?" component={Users} />
                        <Route
                            path="/users/:userId?/edit"
                            component={UsersEditPage}
                        />
                    </QualitiesProvider>
                </ProfessionProvider>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
}
