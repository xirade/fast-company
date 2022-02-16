import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

// components
import Loader from "../../common/Loader";
import QualitiesCard from "../../../components/ui/cards/QualitiesCard";
import UserCard from "../../../components/ui/cards/UserCard";
import MeetingsCard from "src/components/ui/cards/MeetingsCard";
import Comments from "src/components/ui/comments/Comments";
import { useUser } from "src/hooks/useUsers";
import CommentsProvider from "src/hooks/useComments";

export default function UserPage({ id, renderBadges }) {
    const history = useHistory();
    const { users, getUser } = useUser();
    const user = getUser(id);

    const handleRedirect = () => {
        history.push(`${history.location.pathname}/edit`);
    };

    if (user) {
        return (
            <div className="container">
                <div className="row shadow py-1 gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard
                            professionName={user.profession.name}
                            user={user}
                            onRedirect={handleRedirect}
                        />
                        <QualitiesCard
                            id={user.qualities}
                            renderBadges={renderBadges}
                        />
                        <MeetingsCard
                            completedMeetings={user.completedMeetings}
                        />
                    </div>
                    <div className="col-md-8">
                        <CommentsProvider>
                            <Comments users={users} />
                        </CommentsProvider>
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
