import React from "react";
import PropTypes from "prop-types";

function SelectedField({
    onChange,
    onKeyDown,
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
    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}:
            </label>

            <select
                className={getInputClasses()}
                name={name}
                onChange={({ target }) =>
                    onChange({
                        name: target.name,
                        value: {
                            _id: target.childNodes[
                                target.selectedIndex
                            ].getAttribute("id"),
                            name: target.value
                        }
                    })
                }
                onKeyDown={onKeyDown}
                value={!value ? defaultOption : value}
            >
                <option disabled>{defaultOption}</option>
                {options &&
                    Object.keys({ ...options }).map((option) => (
                        <option
                            id={options[option]._id}
                            key={options[option]._id}
                            value={
                                name === "profession"
                                    ? options[option].profession
                                    : options[option].name
                            }
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
    defaultOption: "Choose...",
    label: "Profession",
    name: "profession",
    value: ""
};

SelectedField.propTypes = {
    name: PropTypes.string,
    defaultOption: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    error: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default React.memo(SelectedField);
