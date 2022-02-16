import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { orderBy } from "lodash";
import paginate from "../../../utils/paginate";

// icons
import bookmarkOn from "../../../assets/bookmark_on.svg";
import bookmarkOff from "../../../assets/bookmark_off.svg";

// components
import GroupList from "../../common/GroupList";
import Pagination from "../../common/Pagination";
import UsersTable from "../../ui/UsersTable";
import SearchInput from "../../ui/search/SearchInput";
import SearchStatus from "../../ui/search/SearchStatus";
import Loader from "../../common/Loader";
import { useUser } from "src/hooks/useUsers";
import { useProfession } from "src/hooks/useProfession";
import { useAuth } from "src/hooks/useAuth";

export default function UsersList({ renderBadges }) {
    const { isLoading, professions } = useProfession();
    const { users } = useUser();
    const { currentUser } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState(null);
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 8;
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

    const renderBookmark = (favorite) => {
        const bookmark = favorite ? bookmarkOn : bookmarkOff;
        return <img src={bookmark} alt="bookmark" />;
    };

    const handleDelete = (userId) => {
        // setUsers((prevState) =>
        //     prevState.filter((user) => user._id !== userId)
        // );
        console.log(userId);
    };

    const handleFavorite = (favorite, id) => {
        // setUsers((prevState) =>
        //     prevState.map((state) =>
        //         state._id === id
        //             ? {
        //                   ...state,
        //                   isFavorite: favorite
        //               }
        //             : state
        //     )
        // );
        console.log(favorite, id);
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
        const filterUsers = (data) => {
            const filteredUsers = selectedProf
                ? data.filter((user) => {
                    return user.profession.name === selectedProf.name;
                })
                : filteredSearchUsers;
            return filteredUsers.filter((u) => u._id !== currentUser._id);
        };

        const filteredUsers = filterUsers(users);

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
            <div className="w-100 d-flex flex-column flex-lg-row justify-center">
                {professions && isLoading ? (
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
                ) : (
                    <div className="d-flex flex-column">
                        <SearchStatus phrase={renderPhrase} length={count} />
                    </div>
                )}
            </div>
        );
    }
    return <Loader />;
}

UsersList.propTypes = {
    renderBadges: PropTypes.func.isRequired
};
