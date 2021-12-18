import React from "react";
import Qualities from "./Qualities";
import PropTypes from "prop-types";

export default function QualitiesList({ qualities, renderBadges }) {
    return (
        <>
            {qualities.map((qual) => (
                <Qualities key={qual._id} {...{ qual, renderBadges }} />
            ))}
        </>
    );
}

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired,
    renderBadges: PropTypes.func.isRequired
};
