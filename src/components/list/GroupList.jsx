import React from "react";
import PropTypes from "prop-types";

export default function GroupList({
    items,
    valueProp,
    contentProp,
    onItemSelect,
    selectedItem
}) {
    return (
        <ul className="list-group mt-2">
            {Object.keys({ ...items }).map((item) => (
                <li
                    role="button"
                    key={items[item][valueProp]}
                    className={`list-group-item ${
                        items[item] === selectedItem
                            ? "active"
                            : ""
                    }`}
                    onClick={() => onItemSelect(items[item])}
                >
                    {items[item][contentProp]}
                </li>
            ))}
        </ul>
    );
}
GroupList.defaultProps = {
    valueProp: "_id",
    contentProp: "name"
};

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProp: PropTypes.string.isRequired,
    contentProp: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object
};
