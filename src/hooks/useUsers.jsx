import React, { useContext, createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import userService from "src/services/userService";
import { toast } from "react-toastify";
import Loader from "src/components/common/Loader";
import { useAuth } from "./useAuth";
import { useParams } from "react-router";

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw Error("useUser must be inside an UserProvider");
    return context;
};

const UserProvider = ({ children }) => {
    const { currentUser } = useAuth();
    const { userId } = useParams();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getUsers();
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [userId]);

    async function getUsers() {
        try {
            const { content } = await userService.fetchAll();
            setUsers(content);
            setIsLoading(false);
        } catch (err) {
            errorCatcher(err);
        }
    }

    const getUser = (id) => {
        return users.find((u) => u._id === id);
    };

    async function updateProfile(content) {
        try {
            const data = await userService.update(currentUser._id, content);
            setUsers((prevState) => {
                const itemIndex = prevState.findIndex(
                    (item) => item._id === currentUser._id
                );
                if (itemIndex > -1) {
                    prevState[itemIndex] = data;
                }
                return prevState;
            });
        } catch (err) {
            errorCatcher(err);
        }
    }

    function errorCatcher(err) {
        const { message } = err;
        setError(message);
        setIsLoading(false);
    }
    return (
        <UserContext.Provider value={{ users, updateProfile, getUser }}>
            {!isLoading ? children : <Loader />}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UserProvider;
