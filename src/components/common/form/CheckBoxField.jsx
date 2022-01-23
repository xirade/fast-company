import React from "react";
import PropTypes from "prop-types";

function CheckBoxField({ name, value, onChange, onKeyDown, children, error }) {
    const getInputClasses = () => {
        return `form-check-input${error ? " is-invalid" : " is-valid"}`;
    };
    return (
        <div className="form-check mb-4">
            <input
                className={getInputClasses()}
                type="checkbox"
                id={name}
                onKeyDown={onKeyDown}
                onChange={() => onChange({ name, value: !value })}
                checked={value}
            />
            <label className="form-check-label" htmlFor={name}>
                {children}
            </label>
            {error && <p className="invalid-feedback">{error}</p>}
        </div>
    );
}

CheckBoxField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    error: PropTypes.string
};

export default React.memo(CheckBoxField);
