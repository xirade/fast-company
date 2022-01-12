import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// api
import api from "../../api/index";

// components
import SearchStatus from "../../components/search/SearchStatus";
import Pagination from "../../components/pagination/Pagination";
import GroupList from "../../components/list/GroupList";
import Loader from "../../components/loader/Loader";

// utils
import paginate from "../../utils/paginate";
import UsersTable from "../../components/table/UsersTable";
import { orderBy } from "lodash";

// icons
import bookmarkOn from "../../assets/bookmark_on.svg";
import bookmarkOff from "../../assets/bookmark_off.svg";
import UserCard from "src/components/card/UserCard";
import SearchInput from "src/components/search/SearchInput";

export default function Users() {
    const [users, setUsers] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState(null);
    const [selectedProf, setSelectedProf] = useState(null);
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 8;

    const { userId } = useParams();

    // search query
    const [searchQuery, setSearchQuery] = useState("");
    const filteredSearchUsers =
        users &&
        users.filter((item) => {
            return Object.values(item)
                .join("")
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
        });

    const changeHandler = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(
                data.map((user) => {
                    return { ...user, isFavorite: false };
                })
            );
        });
        api.professions.fetchAll().then((data) => {
            setProfessions(data);
        });
        setCurrentPage(1);
        if (searchQuery) {
            setSelectedProf(null);
        }
    }, [searchQuery]);

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

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setSearchQuery("");
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
            : filteredSearchUsers;

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

        return userId
            ? (
                <UserCard id={userId} {...{ renderBadges }} users={userCrop} />
            )
            : (
                <div className="w-100 d-flex flex-column flex-lg-row justify-center">
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
                                    <SearchInput {...{ searchQuery, changeHandler }} />
                                    <div style={{ minHeight: "590px" }}>
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
    return <Loader />;
}
