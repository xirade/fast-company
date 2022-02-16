import React, { useContext, createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "src/services/userService";
import { toast } from "react-toastify";
import {
    localStorageService,
    setTokens
} from "src/services/localStorageService";
import Loader from "src/components/common/Loader";
import { useHistory } from "react-router";

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_API_KEY
    }
});
const AuthContext = createContext();
let errMessage = "";

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw Error("useAuth must be inside an AuthProvider");
    return context;
};

const AuthProvider = ({ children }) => {
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    const getUserData = async () => {
        try {
            const { content } = await userService.getCurrentUser();
            setCurrentUser(content);
        } catch (error) {
            errorCatcher(error);
            toast.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (error !== null) {
            setError(null);
        }
        if (localStorageService.getAccessToken()) {
            getUserData();
        } else {
            setIsLoading(false);
        }
    }, []);

    const createUser = async (data) => {
        try {
            const { content } = await userService.create(data);
            setCurrentUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    };

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const signUp = async ({ email, password, ...rest }) => {
        try {
            const { data } = await httpAuth.post("accounts:signUp", {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                ...rest
            });
        } catch (error) {
            const { code, message } = error.response.data.error;
            errorCatcher(error);
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    errMessage = "User with this email already exists";
                    toast.warn(errMessage);
                    throw errMessage;
                }
            }
        }
    };

    const signIn = async ({ email, password }) => {
        try {
            const { data } = await httpAuth.post(
                "accounts:signInWithPassword",
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            );
            setTokens(data);
            await getUserData();
        } catch (error) {
            const { code, message } = error.response.data.error;
            errorCatcher(error);
            if (code === 400) {
                if (message === "INVALID_PASSWORD") {
                    errMessage = "Incorrect password try again!";
                }
                if (message === "EMAIL_NOT_FOUND") {
                    errMessage = "User with this email not found!";
                }
                toast.warn(errMessage);
                throw errMessage;
            }
        }
    };

    const changeEmail = async (email) => {
        try {
            const { data } = await httpAuth.post("accounts:update", {
                idToken: localStorageService.getAccessToken(),
                email,
                returnSecureToken: true
            });
            setTokens(data);
            await getUserData();
        } catch (error) {
            const { code, message } = error.response.data.error;
            errorCatcher(error);
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    errMessage =
                        "The email address is already in use by another account";
                }
                if (message === "INVALID_ID_TOKEN") {
                    errMessage = "The user's credential is no longer valid";
                }

                toast.warn(errMessage);
                throw errMessage;
            }
        }
    };

    function logOut() {
        localStorageService.removeAuthData();
        setCurrentUser(null);
        history.push("/");
    }

    return (
        <AuthContext.Provider
            value={{ signUp, signIn, logOut, changeEmail, currentUser }}
        >
            {!isLoading ? children : <Loader />}
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
