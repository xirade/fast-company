import React from "react";
import { useParams } from "react-router-dom";

import UserPage from "src/components/page/user-page";
import UsersListPage from "src/components/page/user-list-page";
import UserProvider from "src/hooks/useUsers";

export default function Users() {
    const { userId } = useParams();

    const renderBadges = (quality) => {
        return (
            <span key={quality._id} className={`badge bg-${quality.color} m-1`}>
                {quality.name}
            </span>
        );
    };

    return (
        <UserProvider>
            {userId ? (
                <UserPage id={userId} renderBadges={renderBadges} />
            ) : (
                <UsersListPage renderBadges={renderBadges} />
            )}
        </UserProvider>
    );
}
