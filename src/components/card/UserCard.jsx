import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

// api
import api from "../../api/index";

// components
import QualitiesList from "../list/QualitiesList";
import Loader from "../loader/Loader";

export default function UserCard({ id, renderBadges }) {
    const history = useHistory();
    const [user, setUser] = useState(null);

    useEffect(() => {
        api.users.getById(id).then((user) => setUser(user));
    }, [id]);

    const handleRedirect = () => {
        history.push("/users");
    };

    if (user) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card shadow-sm p-3">
                            <div className="d-flex flex-xl-row flex-lg-column flex-md-row flex-column align-items-center">
                                <div className="image">
                                    <img
                                        className="img-thumbnail min-w"
                                        src={user.img}
                                        alt="people"
                                        style={{minWidth: "250px", minHeight: "200px"}}
                                    />
                                </div>
                                <div className="d-flex flex-column ms-3 w-100">
                                    <h4 className="mb-0 mt-0">{user.name}</h4>
                                    <span>{user.profession.name}</span>
                                    <div className="p-2 mt-2 bg-light d-flex justify-content-between rounded text-black stats">
                                        <div className="d-flex flex-column">
                                            <span className="articles">
                                                Качества
                                            </span>
                                            <QualitiesList
                                                qualities={user.qualities}
                                                renderBadges={renderBadges}
                                            />
                                        </div>
                                        <div className="d-flex flex-column">
                                            <span>Тусанул</span>
                                            <span>
                                                {user.completedMeetings}
                                            </span>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <span className="rating">
                                                Рейтинг
                                            </span>
                                            <span>{user.rate}</span>
                                        </div>
                                    </div>
                                    <div className="button mt-5 align-self-end">
                                        <button
                                            onClick={() => handleRedirect()}
                                            className="btn btn-outline-primary"
                                        >
                                            Все пользователи
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <Loader />;
}

UserCard.propTypes = {
    id: PropTypes.string.isRequired,
    renderBadges: PropTypes.func.isRequired
};
