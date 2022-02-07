import React, { useContext, createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import userService from "src/services/userService";
import { toast } from "react-toastify";
import Loader from "src/components/common/Loader";

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw Error("useUser must be inside an UserProvider");
    return context;
};

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getUsers();
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    async function getUsers() {
        try {
            const { content } = await userService.fetchAll();
            setUsers(content);
            setIsLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    const getUser = (id) => {
        return users.find((u) => u._id === id);
    };

    function errorCatcher(error) {
        const { message } = error;
        console.log(message);
        setIsLoading(false);
    }
    return (
        <UserContext.Provider value={{ users, getUser }}>
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
