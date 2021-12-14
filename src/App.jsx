import React, { useEffect, useState } from "react";
import Users from "./components/Users";
import api from "./api/index";

// icons
import bookmarkOn from "./assets/bookmark_on.svg";
import bookmarkOff from "./assets/bookmark_off.svg";

export default function App() {
    const [users, setUsers] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) =>
            setUsers(
                data.map((user) => {
                    return { ...user, isFavorite: false };
                })
            )
        );
    }, []);

    const handleDelete = (userId) => {
        setUsers((prevState) =>
            prevState.filter((user) => user._id !== userId)
        );
    };

    const handleFavorite = (favorite, id) => {
        setUsers((prevState) =>
            prevState.map((state) =>
                state._id === id
                    ? {
                        ...state,
                        isFavorite: favorite
                    }
                    : state
            )
        );
    };

    const renderPhrase = (number) => {
        const text = `${number} человек тусанет с тобой сегодня`;

        if (!number) return "Никто с тобой не тусанет";

        if (number > 10 && number < 20) {
            return text;
        }

        if (number % 10 > 1 && number % 10 < 5) {
            return `${number} человека тусанут с тобой сегодня`;
        }

        return text;
    };

    const renderBadges = (qualities) => {
        return qualities.map((quality) => (
            <span key={quality._id} className={`badge bg-${quality.color} m-1`}>
                {quality.name}
            </span>
        ));
    };

    const renderBookmark = (favorite) => {
        const bookmark = favorite
            ? bookmarkOn
            : bookmarkOff;
        return <img src={bookmark} alt="bookmark" />;
    };

    return (
        Array.isArray(users) && (
            <Users
                users={users}
                onFavorite={handleFavorite}
                onDelete={handleDelete}
                renderPhrase={renderPhrase}
                renderBadges={renderBadges}
                renderBookmark={renderBookmark}
            />
        )
    );
}
