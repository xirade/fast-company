import React from "react";
import PropTypes from "prop-types";

export default function Table({ children }) {
    return (
        <table className="table table-hover mt-2">
            <caption>
                <em> Список заядлых тусовщиков</em>
            </caption>
            {children}
        </table>
    );
}

Table.propTypes = {
    children: PropTypes.array.isRequired
};
