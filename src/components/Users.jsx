import React, { useState } from "react";
import PropTypes from "prop-types";

// components
import SearchStatus from "./SearchStatus";
import User from "./User";
import Pagination from "./Pagination";
// utils
import paginate from "../utils/paginate";

export default function Users({ users, renderPhrase, ...props }) {
    const count = users.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const handleChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const userCrop = paginate(users, currentPage, pageSize);
    return (
        <>
            {count === 0
                ? (
                    <SearchStatus phrase={renderPhrase} length={users.length} />
                )
                : (
                    <div>
                        <SearchStatus phrase={renderPhrase} length={users.length} />
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
                                    <User key={user._id} user={user} {...props} />
                                ))}
                            </tbody>
                        </table>
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handleChange}
                        />
                        {/* 1,2,3 */}
                    </div>
                )}
        </>
    );
}

Users.propTypes = {
    users: PropTypes.array.isRequired,
    renderPhrase: PropTypes.func.isRequired
};
