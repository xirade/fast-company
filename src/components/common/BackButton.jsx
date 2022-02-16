import React from "react";
import { useHistory } from "react-router-dom";

// icons
import Back from "../../assets/arrow-left.svg";

export default function BackButton() {
    const history = useHistory();
    return (
        <button className="ms-3 btn btn-outline-light px-4 text-dark d-flex align-items-center fw-bold" onClick={() => history.goBack()}>
            <img src={Back} alt="arrow left" />
            <span className="ms-2">Go Back</span>
        </button>
    );
}
