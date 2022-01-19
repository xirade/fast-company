import React from "react";
import PropTypes from "prop-types";

export default function Quality({ qual, renderBadges }) {
    return <>{renderBadges(qual)}</>;
}

Quality.propTypes = {
    qual: PropTypes.object.isRequired,
    renderBadges: PropTypes.func.isRequired
};
