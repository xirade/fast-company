import React, { useEffect, useState } from "react";

// api
import api from "../api/index";

// components
import SearchStatus from "./SearchStatus";
import Pagination from "./Pagination";
import GroupList from "./GroupList";
import Loader from "./Loader";

// utils
import paginate from "../utils/paginate";
import UsersTable from "./UsersTable";
import { orderBy } from "lodash";

// icons
import bookmarkOn from "../assets/bookmark_on.svg";
import bookmarkOff from "../assets/bookmark_off.svg";

export default function Users() {
    const [users, setUsers] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) =>
            setUsers(
                data.map((user) => {
                    return { ...user, isFavorite: false };
                })
            )
        );
    }, []);

    const handleDelete = (userId) => {
        setUsers((prevState) =>
            prevState.filter((user) => user._id !== userId)
        );
    };

    const handleFavorite = (favorite, id) => {
        setUsers((prevState) =>
            prevState.map((state) =>
                state._id === id
                    ? {
                        ...state,
                        isFavorite: favorite
                    }
                    : state
            )
        );
    };

    const renderPhrase = (number) => {
        const text = `${number} человек тусанет с тобой сегодня`;

        if (!number) return "Никто с тобой не тусанет";

        if (number > 10 && number < 20) {
            return text;
        }

        if (number % 10 > 1 && number % 10 < 5) {
            return `${number} человека тусанут с тобой сегодня`;
        }

        return text;
    };

    const renderBadges = (quality) => {
        return (
            <span key={quality._id} className={`badge bg-${quality.color} m-1`}>
                {quality.name}
            </span>
        );
    };

    const renderBookmark = (favorite) => {
        const bookmark = favorite ? bookmarkOn : bookmarkOff;
        return <img src={bookmark} alt="bookmark" />;
    };

    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState(null);
    const [selectedProf, setSelectedProf] = useState(null);
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            setProfessions(data);
        });
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const handleChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter((user) => {
                return user.profession.name === selectedProf.name;
            })
            : users;

        const sortedUsers = orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );

        const count = filteredUsers.length;
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <div className="w-100 d-flex justify-center">
                {professions
                    ? (
                        <>
                            <div className="d-flex flex-column p-3">
                                <GroupList
                                    selectedItem={selectedProf}
                                    items={professions}
                                    onItemSelect={handleProfessionSelect}
                                />
                                <button
                                    className="btn btn-secondary mt-2"
                                    onClick={() => clearFilter()}
                                >
                                    Очистить
                                </button>
                            </div>
                            <div className="d-flex flex-column flex-fill">
                                <SearchStatus
                                    phrase={renderPhrase}
                                    length={count}
                                />
                                <div className="table-responsive">
                                    <UsersTable
                                        onSort={handleSort}
                                        selectedSort={sortBy}
                                        users={userCrop}
                                        onDelete={handleDelete}
                                        onFavorite={handleFavorite}
                                        renderBookmark={renderBookmark}
                                        renderBadges={renderBadges}
                                    />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <Pagination
                                        itemsCount={count}
                                        pageSize={pageSize}
                                        currentPage={currentPage}
                                        onPageChange={handleChange}
                                    />
                                </div>
                            </div>
                        </>
                    )
                    : (
                        <div className="d-flex flex-column">
                            <SearchStatus phrase={renderPhrase} length={count} />
                        </div>
                    )}
            </div>
        );
    }
    return (<Loader />);
}
