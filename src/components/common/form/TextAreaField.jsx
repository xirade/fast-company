import React from "react";
import PropTypes from "prop-types";
import debounce from "src/utils/debounce";

function TextAreaField({
    label,
    name,
    value,
    onChange,
    onKeyDown,
    error,
    autoFocus
}) {
    const getInputClasses = () => {
        return `form-control${error ? " is-invalid" : " is-valid"}`;
    };

    const handleChange = (text) => {
        onChange(text);
    };

    const emitChange = (target) => {
        const [name, value] = target;
        handleChange({ name, value });
    };
    const optimisedHandleChange = debounce(emitChange, 500);

    return (
        <div className="form-floating mb-4">
            <textarea
                className={getInputClasses()}
                name={name}
                onChange={(e) =>
                    optimisedHandleChange([e.target.name, e.target.value])
                }
                defaultValue={value}
                id={name}
                autoFocus={autoFocus}
                onKeyDown={onKeyDown}
                style={{ height: "100px" }}
            />
            <label htmlFor={name}>{label}</label>
            {error && <p className="invalid-feedback">{error}</p>}
        </div>
    );
}

TextAreaField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    error: PropTypes.string,
    autoFocus: PropTypes.bool
};

export default React.memo(TextAreaField);
