import React from "react";
import PropTypes from "prop-types";

export default function Qualities({ qualities, badges }) {
    return <>{badges(qualities)}</>;
}

Qualities.propTypes = {
    qualities: PropTypes.array.isRequired,
    badges: PropTypes.func.isRequired
};
