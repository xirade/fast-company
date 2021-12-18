import React from "react";
import PropTypes from "prop-types";

export default function Qualities({ qual, renderBadges }) {
    return <>{renderBadges(qual)}</>;
}

Qualities.propTypes = {
    qual: PropTypes.object.isRequired,
    renderBadges: PropTypes.func.isRequired
};
