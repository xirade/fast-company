import React from "react";
import PropTypes from "prop-types";

export default function SearchStatus({ phrase, length }) {
    return (
        <span className="d-inline-flex badge fs-4 bg-primary p-2">
            {phrase(length)}
        </span>
    );
}

SearchStatus.propTypes = {
    phrase: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired
};
