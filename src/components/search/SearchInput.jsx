import React from "react";
import PropTypes from "prop-types";

export default function SearchInput({ changeHandler, searchQuery }) {
    return (
        <div className="mt-3">
            <input
                className="form-control"
                type="search"
                placeholder="Search..."
                onInput={changeHandler}
                value={searchQuery}
            />
        </div>
    );
}

SearchInput.propTypes = {
    changeHandler: PropTypes.func.isRequired,
    searchQuery: PropTypes.string
};
