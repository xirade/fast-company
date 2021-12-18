import React from "react";
import PropTypes from "prop-types";

export default function Table({ children }) {
    return <table className="table mt-2">{children}</table>;
}

Table.propTypes = {
    children: PropTypes.array.isRequired
};
