import React from "react";
import PropTypes from "prop-types";

export default function Bookmark({ onFavorite, renderBookmark, user }) {
    return (
        <>
            <span
                className="btn btn-light"
                onClick={() => onFavorite(!user.isFavorite, user._id)}
            >
                {renderBookmark(user.isFavorite)}
            </span>
        </>
    );
}

Bookmark.propTypes = {
    onFavorite: PropTypes.func.isRequired,
    renderBookmark: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};
