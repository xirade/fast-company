import React from "react";
import { useProfession } from "src/hooks/useProfession";
import PropTypes from "prop-types";

export const Profession = ({ id }) => {
    const { isLoading, getProfession } = useProfession();
    const { name } = getProfession(id);

    if (!isLoading) {
        return <p>{name}</p>;
    }
    return <div></div>;
};

Profession.propTypes = {
    id: PropTypes.string
};
