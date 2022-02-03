import React from "react";
import PropTypes from "prop-types";

function RadioField({ onChange, onKeyDown, options, value, name, label }) {
    return (
        <div className="mb-4">
            <label className="form-label d-block">{label}:</label>
            {Object.keys({ ...options }).map((option) => (
                <div
                    key={`${options[option].name}_${options[option].value}`}
                    className="form-check form-check-inline"
                >
                    <input
                        className="form-check-input"
                        type="radio"
                        name={name}
                        id={`${options[option].name}_${options[option].value}`}
                        checked={options[option].value === value}
                        value={options[option].value}
                        onChange={({ target }) =>
                            onChange({ name: target.name, value: target.value })
                        }
                        onKeyDown={onKeyDown}
                    />
                    <label
                        className="form-check-label"
                        htmlFor={`${options[option].name}_${options[option].value}`}
                    >
                        {options[option].name}
                    </label>
                </div>
            ))}
        </div>
    );
}

RadioField.defaultProps = {
    options: [
        { name: "Male", value: "male" },
        { name: "Female", value: "female" },
        { name: "Other", value: "other" }
    ]
};

RadioField.propTypes = {
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    label: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.array
};

export default React.memo(RadioField);
