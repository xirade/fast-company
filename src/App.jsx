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
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Logout from "./layout/auth/Logout";
import UserProvider from "./hooks/useUsers";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <Navbar />
                    <Route exact path="/" component={Home} />
                    <UserProvider>
                        <ProfessionProvider>
                            <QualitiesProvider>
                                <Route path="/login:type?" component={Login} />
                                <Route
                                    exact
                                    path="/logout"
                                    component={Logout}
                                />
                                <ProtectedRoute
                                    exact
                                    path="/users/:userId?"
                                    component={Users}
                                />
                                <ProtectedRoute
                                    path="/users/:userId?/edit"
                                    component={UsersEditPage}
                                />
                            </QualitiesProvider>
                        </ProfessionProvider>
                    </UserProvider>
                </AuthProvider>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
}
