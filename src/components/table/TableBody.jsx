import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import PropType from "prop-types";
import { get } from "lodash";
import { TransitionGroup, CSSTransition } from "react-transition-group";

// styles
import "./TableBody.css";

export default function TableBody({ data, columns }) {
    const history = useHistory();

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

    const handleUser = (id) => {
        history.push(`/users/${id}`);
    };

    return (
        <TransitionGroup component="tbody" className="animated-table">
            {data.map((item) => (
                <CSSTransition timeout={200} classNames="item" key={item.name}>
                    <tr
                        onClick={(e) => {
                            e.target.closest(".btn")
                                ? false
                                : handleUser(item._id);
                        }}
                        role="button"
                        style={{ height: "60px" }}
                    >
                        {Object.keys(columns).map((column) => (
                            <td key={column}>
                                {renderContent(item, column)}
                                {columns[column].maxRate &&
                                    ` / ${columns[column].maxRate}`}
                            </td>
                        ))}
                    </tr>
                </CSSTransition>
            ))}
        </TransitionGroup>
    );
}

TableBody.propTypes = {
    data: PropType.array.isRequired,
    columns: PropType.object.isRequired
};
