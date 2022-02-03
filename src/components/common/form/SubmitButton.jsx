import React from "react";
import PropTypes from "prop-types";

function SubmitButton({ valid, name, buttonStyle }) {
    return (
        <button className={buttonStyle} disabled={!valid}>
            {name}
        </button>
    );
}

SubmitButton.defaultProps = {
    buttonStyle: "btn btn-primary w-100 mb-2"
};

SubmitButton.propTypes = {
    valid: PropTypes.bool,
    name: PropTypes.string,
    buttonStyle: PropTypes.string
};

export default React.memo(SubmitButton);
