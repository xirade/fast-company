import React from "react";
import PropTypes from "prop-types";

export default function SelectedField({
    onChange,
    defaultOption,
    value,
    options,
    name,
    error,
    label
}) {
    const getInputClasses = () => {
        return `form-select${error ? " is-invalid" : " is-valid"}`;
    };

    const handleChange = ({ target }) => {
        const { name, value, selectedIndex, childNodes } = target;
        const currId = childNodes[selectedIndex].getAttribute("id");
        onChange({ name, value: { _id: currId, name: value } });
    };

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}:
            </label>

            <select
                className={getInputClasses()}
                name="profession"
                onChange={handleChange}
                value={!value ? defaultOption : value}
            >
                <option disabled>{defaultOption}</option>
                {options &&
                    Object.keys({ ...options }).map((option) => (
                        <option
                            id={options[option]._id}
                            key={options[option]._id}
                            value={options[option].profession}
                        >
                            {options[option].name}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
}

SelectedField.defaultProps = {
    defaultOption: "Choose..."
};

SelectedField.propTypes = {
    name: PropTypes.string,
    defaultOption: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
