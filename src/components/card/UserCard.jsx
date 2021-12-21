import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../api/index";
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
            <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-8">
                    <div className="card">
                        <div className="card-header h3">{user.name}</div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <p>
                                    Профессия: {user.profession.name}
                                    <span className="d-block">
                                        Рейтинг: {user.rate}
                                    </span>
                                    <QualitiesList
                                        qualities={user.qualities}
                                        renderBadges={renderBadges}
                                    />
                                </p>

                                <footer className="blockquote-footer mb-3">
                                    <span>
                                        Я тусанул {user.completedMeetings}{" "}
                                        раз(а)
                                    </span>
                                </footer>
                            </blockquote>
                            <button
                                onClick={() => handleRedirect()}
                                className="btn btn-primary"
                            >
                                Все пользователи
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <Loader />;
}
