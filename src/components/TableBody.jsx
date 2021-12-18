import React from "react";
import PropType from "prop-types";
import { get } from "lodash";

export default function TableBody({ data, columns }) {
    const renderContent = (item, column) => {
        if (columns[column].component) {
            const component = columns[column].component;
            if (typeof component === "function") {
                return component(item);
            }
            return component;
        }
        return get(item, columns[column].path);
    };

    return (
        <tbody>
            {data.map((item) => (
                <tr key={item.name}>
                    {Object.keys(columns).map((column) => (
                        <td key={column}>
                            {renderContent(item, column)}
                            {columns[column].maxRate &&
                                ` / ${columns[column].maxRate}`}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
}

TableBody.propTypes = {
    data: PropType.array.isRequired,
    columns: PropType.object.isRequired
};
