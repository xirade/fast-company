import React from "react";
import Quality from "./Quality";
import PropTypes from "prop-types";

export default function QualitiesList({ qualities, renderBadges }) {
    return (
        <>
            {qualities.map((qual) => (
                <Quality key={qual._id} {...{ qual, renderBadges }} />
            ))}
        </>
    );
}

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired,
    renderBadges: PropTypes.func.isRequired
};
