import React from "react";
import { range } from "lodash";
import PropTypes from "prop-types";

export default function Pagination({
    itemsCount,
    pageSize,
    onPageChange,
    currentPage
}) {
    const pageCount = Math.ceil(itemsCount / pageSize);
    const pages = range(1, pageCount + 1);
    return (
        <>
            {pageCount !== 1 && (
                <nav>
                    <ul className="pagination">
                        {pages.map((page) => (
                            <li
                                key={page}
                                className={`page-item${
                                    page === currentPage ? " active" : ""
                                }`}
                            >
                                <button
                                    onClick={() => onPageChange(page)}
                                    className="page-link"
                                >
                                    {page}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </>
    );
}

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};
