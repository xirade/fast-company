import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import debounce from "src/utils/debounce";

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

    const handleChange = (target) => {
        const [name, value] = target;
        onChange({ name, value });
    };

    const emitChange = useCallback((currArr) => {
        const value = currArr.map((item, i) => ({
            _id: currArr[i].value,
            name: currArr[i].label,
            color: currArr[i].color
        }));
        handleChange([name, value]);
    }, []);

    const optimisedHandleChange = debounce(emitChange, 500);

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
                onChange={optimisedHandleChange}
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
