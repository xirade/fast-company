import React, { useState } from "react";
import PropTypes from "prop-types";

// icons
import Eye from "../../../assets/eye.svg";
import SlashEye from "../../../assets/eye-slash.svg";

function TextField({
    label,
    type,
    name,
    value,
    onChange,
    onKeyDown,
    error,
    autoFocus
}) {
    const [showPassword, setShowPassword] = useState(false);

    const getInputClasses = () => {
        return `form-control${error ? " is-invalid" : " is-valid"}`;
    };

    const toggleShowPassword = () => setShowPassword((prevState) => !prevState);

    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}:</label>
            <div className="input-group has-validation">
                <input
                    className={getInputClasses()}
                    type={showPassword ? "text" : type}
                    id={name}
                    name={name}
                    onChange={(e) => onChange(e.target)}
                    onKeyDown={onKeyDown}
                    value={value}
                    autoFocus={autoFocus}
                />
                {type === "password" && (
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={toggleShowPassword}
                    >
                        <img
                            style={{ height: "20px", width: "20px" }}
                            src={!showPassword ? Eye : SlashEye}
                            alt="eye"
                        />
                    </button>
                )}
                {error && <p className="invalid-feedback">{error}</p>}
            </div>
        </div>
    );
}
TextField.defaultProps = {
    type: "text"
};

TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    error: PropTypes.string,
    autoFocus: PropTypes.bool
};

export default React.memo(TextField);
