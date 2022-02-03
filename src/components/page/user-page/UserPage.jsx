import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

// api
import api from "../../../api/index";

// components
import Loader from "../../common/Loader";
import QualitiesCard from "../../../components/ui/cards/QualitiesCard";
import UserCard from "../../../components/ui/cards/UserCard";
import MeetingsCard from "src/components/ui/cards/MeetingsCard";
import Comments from "src/components/ui/comments/Comments";

export default function UserPage({ id, renderBadges }) {
    const history = useHistory();
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState(null);

    useEffect(() => {
        let isSub = true;
        api.users.getById(id).then((user) => (isSub ? setUser(user) : null));
        api.users.fetchAll(id).then((user) =>
            isSub
                ? setUsers(
                    user.map((user) => ({
                        _id: user._id,
                        name: user.name
                    }))
                )
                : null
        );
        return () => (isSub = false);
    }, [id]);

    const handleRedirect = () => {
        history.push(`${history.location.pathname}/edit`);
    };

    if (user) {
        return (
            <div className="container">
                <div className="row shadow py-1 gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard
                            userName={user.name}
                            professionName={user.profession.name}
                            userRate={user.rate}
                            userImg={user.img}
                            onRedirect={handleRedirect}
                        />
                        <QualitiesCard
                            qualities={user.qualities}
                            renderBadges={renderBadges}
                        />
                        <MeetingsCard
                            completedMeetings={user.completedMeetings}
                        />
                    </div>
                    <div className="col-md-8">
                        <Comments users={users} />
                    </div>
                </div>
            </div>
        );
    }

    return <Loader />;
}

UserPage.propTypes = {
    id: PropTypes.string.isRequired,
    renderBadges: PropTypes.func.isRequired
};
