import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function NavProfile({ user }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{user.name}</div>
                <img
                    src={user.image}
                    height="40"
                    className="img-responsive rounded-circle"
                />
            </div>
            <div className={`w-100 dropdown-menu ${isOpen ? "show" : ""}`}>
                <Link to={`/users/${user._id}`} className="dropdown-item">
                    Profile
                </Link>
                <Link to="/logout" className="dropdown-item">
                    Logout
                </Link>
            </div>
        </div>
    );
}

NavProfile.propTypes = {
    user: PropTypes.object
};

export default NavProfile;
