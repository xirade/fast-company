import React, { useContext, createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "src/services/userService";
import { toast } from "react-toastify";
import { setTokens } from "src/services/localStorageService";

const key = process.env.REACT_APP_API_KEY;
const httpAuth = axios.create();
const AuthContext = createContext();
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw Error("useAuth must be inside an AuthProvider");
    return context;
};

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [error, setError] = useState(null);

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    const createUser = async (data) => {
        try {
            const { content } = await userService.create(data);
            setCurrentUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    };

    const signUp = async ({ email, password, ...rest }) => {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                ...rest
            });
        } catch (error) {
            const { code, message } = error.response.data.error;
            errorCatcher(error);
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "User with this email already exists"
                    };
                    toast.warn(errorObject.email);
                    throw errorObject;
                }
            }
        }
    };

    const signIn = async ({ email, password }) => {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
        } catch (error) {
            const { code, message } = error.response.data.error;
            errorCatcher(error);
            if (code === 400) {
                const errorObject = {
                    email: "",
                    password: ""
                };
                if (message === "INVALID_PASSWORD") {
                    errorObject.password = "Incorrect password try again!";
                    toast.warn(errorObject.password);
                }
                if (message === "EMAIL_NOT_FOUND") {
                    errorObject.email = "User with this email not found!";
                    toast.warn(errorObject.email);
                }
                throw errorObject;
            }
        }
    };

    return (
        <AuthContext.Provider value={{ signUp, signIn, currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProvider;
