import React, { useState } from "react";
import PropTypes from "prop-types";

// icons
import Eye from "../../assets/eye.svg";
import SlashEye from "../../assets/eye-slash.svg";

export default function TextField({
    label,
    type,
    name,
    value,
    onChange,
    error
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
                    onChange={onChange}
                    value={value}
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
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
};
