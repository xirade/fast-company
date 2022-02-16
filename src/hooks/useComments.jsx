import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import commentService from "src/services/commentService";
import { toast } from "react-toastify";
import { useParams } from "react-router";

const CommentsContext = createContext();

export const useComments = () => {
    const context = useContext(CommentsContext);
    if (!context) throw Error("useComments must be inside an CommentsProvider");
    return context;
};

export const CommentsProvider = ({ children }) => {
    const { userId } = useParams();
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getComments();
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error, userId]);

    async function getComments() {
        try {
            const { content } = await commentService.getComments(userId);
            setComments(content);
        } catch (err) {
            errorCatcher(err);
        } finally {
            setIsLoading(false);
        }
    }

    function errorCatcher(error) {
        console.log(error);
        const { message } = error.response.data;
        setError(message);
    }

    async function createComment(data) {
        try {
            const { content } = await commentService.create(data);
            setComments((prevState) => [...prevState, content]);
        } catch (err) {
            errorCatcher(err);
        }
    }

    async function removeComment(id) {
        try {
            const content = await commentService.remove(id);
            if (!content) {
                setComments((prevState) =>
                    prevState.filter((comment) => comment._id !== id)
                );
            }
        } catch (err) {
            errorCatcher(err);
        }
    }

    return (
        <CommentsContext.Provider
            value={{ comments, createComment, removeComment, isLoading }}
        >
            {children}
        </CommentsContext.Provider>
    );
};

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default CommentsProvider;
