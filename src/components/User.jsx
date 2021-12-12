import React from "react";
import PropTypes from "prop-types";

// components
import Bookmark from "./Bookmark";
import Qualities from "./Qualities";
export default function User({
    user,
    onDelete,
    renderBadges,
    renderBookmark,
    onFavorite
}) {
    return (
        <>
            <tr key={user._id}>
                <th>{user.name}</th>
                <th>
                    <Qualities
                        qualities={user.qualities}
                        badges={renderBadges}
                    />
                </th>
                <th>{user.profession.name}</th>
                <th>{user.completedMeetings}</th>
                <th>
                    <Bookmark
                        onFavorite={onFavorite}
                        user={user}
                        renderBookmark={renderBookmark}
                    />
                </th>
                <th>{user.rate} / 5</th>
                <th>
                    <button
                        className="btn btn-danger"
                        onClick={() => onDelete(user._id)}
                    >
                        Delete
                    </button>
                </th>
            </tr>
        </>
    );
}

User.propTypes = {
    user: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    renderBadges: PropTypes.func.isRequired,
    renderBookmark: PropTypes.func.isRequired,
    onFavorite: PropTypes.func.isRequired
};
