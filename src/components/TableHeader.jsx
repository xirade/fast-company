import React from "react";
import PropTypes from "prop-types";

export default function TableHeader({
    onSort,
    selectedSort,
    renderCaret,
    columns
}) {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        {...{ role: columns[column].path && "button" }}
                        scope="col"
                    >
                        <span>
                            {columns[column].name}
                            {renderCaret(columns[column].path)}
                        </span>
                    </th>
                ))}
            </tr>
        </thead>
    );
}

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired,
    renderCaret: PropTypes.func.isRequired
};
