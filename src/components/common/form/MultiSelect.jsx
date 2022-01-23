import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Select from "react-select";

function MultiSelect({
    options,
    defaultValue,
    onKeyDown,
    onChange,
    name,
    label,
    error
}) {
    const getInputClasses = () => {
        return `basic-multi-select${error ? " is-invalid" : " is-valid"}`;
    };

    const handleChange = useCallback((currArr) => {
        const value = currArr.map((item, i) => ({
            _id: currArr[i].value,
            name: currArr[i].label,
            color: currArr[i].color
        }));
        onChange({ name, value });
    }, []);

    return (
        <div className="mb-4">
            <label className="form-label">{label}:</label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                defaultValue={defaultValue}
                options={[...options]}
                className={getInputClasses()}
                classNamePrefix="select"
                name={name}
                onChange={handleChange}
                onKeyDown={onKeyDown}
            />
            {error && <p className="invalid-feedback">{error}</p>}
        </div>
    );
}

MultiSelect.propTypes = {
    name: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    defaultValue: PropTypes.array,
    error: PropTypes.string,
    label: PropTypes.string
};

export default React.memo(MultiSelect);
