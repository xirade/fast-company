import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Bookmark from "../bookmark/Bookmark";

// caret icons
import caretUp from "../../assets/arrow_drop_up.svg";
import caretDown from "../../assets/arrow_drop_down.svg";
import QualitiesList from "../list/QualitiesList";
import Table from "./Table";

export default function UsersTable({
    users,
    onSort,
    onFavorite,
    selectedSort,
    renderBookmark,
    onDelete,
    renderBadges
}) {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: {
            name: "Качества",
            component: (user) => (
                <QualitiesList
                    {...{ renderBadges }}
                    qualities={user.qualities}
                />
            )
        },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился(раз)"
        },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    onFavorite={onFavorite}
                    user={user}
                    renderBookmark={renderBookmark}
                />
            )
        },
        rate: { path: "rate", name: "Оценка", maxRate: 5 },
        delete: {
            component: (user) => (
                <button
                    className="btn btn-danger"
                    onClick={() => onDelete(user._id)}
                >
                    Delete
                </button>
            )
        }
    };

    const renderCaret = (path) => {
        if (path === selectedSort.path) {
            const caret =
                selectedSort.order === "asc"
                    ? { src: caretUp, alt: "caret_up" }
                    : { src: caretDown, alt: "caret_down" };
            return <img src={caret.src} alt={caret.alt} />;
        }
    };

    return (
        <Table className="table mt-2">
            <TableHeader
                {...{ onSort, selectedSort, renderCaret }}
                columns={columns}
            />
            <TableBody {...{ columns, data: users }} />
        </Table>
    );
}

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    renderBookmark: PropTypes.func.isRequired,
    renderBadges: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onFavorite: PropTypes.func.isRequired
};
