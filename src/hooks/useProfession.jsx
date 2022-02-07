import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import professionService from "src/services/professionService";
import { toast } from "react-toastify";

const ProfessionContext = createContext();

export const useProfession = () => {
    const context = useContext(ProfessionContext);
    if (!context) throw Error("useProfession must be inside an ProfessionProvider");
    return context;
};

const ProfessionProvider = ({ children }) => {
    const [professions, setProfessions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProfessions();
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    function getProfession(id) {
        return professions.find((p) => p._id === id);
    }

    async function fetchProfessions() {
        try {
            const { content } = await professionService.get();
            setProfessions(content);
            setIsLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function errorCatcher(error) {
        const { message } = error;
        console.log(message);
        setIsLoading(false);
    }

    return (
        <ProfessionContext.Provider value={{ professions, isLoading, getProfession }}>
            {children}
        </ProfessionContext.Provider>
    );
};

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProfessionProvider;
