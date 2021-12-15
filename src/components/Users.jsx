import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// api
import api from "../api/index";

// components
import SearchStatus from "./SearchStatus";
import User from "./User";
import Pagination from "./Pagination";
import GroupList from "./GroupList";

// utils
import paginate from "../utils/paginate";

export default function Users({ users, renderPhrase, ...props }) {
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState(null);
    const [selectedProf, setSelectedProf] = useState(null);

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
    const filteredUsers = selectedProf
        ? users.filter((user) => {
            return user.profession.name === selectedProf.name;
        })
        : users;
    const count = filteredUsers.length;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);
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
                            <SearchStatus phrase={renderPhrase} length={count} />
                            <div className="d-flex flex-column">
                                <table className="table mt-2">
                                    <thead>
                                        <tr>
                                            <th scope="col">Имя</th>
                                            <th scope="col">Качества</th>
                                            <th scope="col">Профессия</th>
                                            <th scope="col">Встретился(раз)</th>
                                            <th scope="col">Избранное</th>
                                            <th scope="col">Оценка</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userCrop.map((user) => (
                                            <User
                                                key={user._id}
                                                user={user}
                                                {...props}
                                            />
                                        ))}
                                    </tbody>
                                </table>
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

Users.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    renderPhrase: PropTypes.func.isRequired
};
