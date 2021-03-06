import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/Bookmark";
import Table, { TableHeader, TableBody } from "../common/table";
import Qualities from "./qualities";

// caret icons
import caretUp from "../../assets/arrow_drop_up.svg";
import caretDown from "../../assets/arrow_drop_down.svg";
import { Profession } from "./Profession";

export default function UsersTable({
    users,
    onSort,
    onFavorite,
    selectedSort,
    renderBookmark,
    renderBadges
}) {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: {
            name: "Качества",
            component: (user) => (
                <Qualities {...{ renderBadges }} id={user.qualities} />
            )
        },
        professions: {
            name: "Профессия",
            component: (user) => <Profession id={user.profession} />
        },
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
        rate: { path: "rate", name: "Оценка", maxRate: 5 }
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
    onFavorite: PropTypes.func.isRequired
};
