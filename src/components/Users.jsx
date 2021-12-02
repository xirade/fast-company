import React, { useState } from "react";
import api from "../api";

export const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
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
  return (
    <>
      {users.length === 0 ? (
        <span className="badge fs-4 bg-danger p-2">
          {renderPhrase(users.length)}
        </span>
      ) : (
        <div>
          <span className="badge fs-4 bg-primary p-2">
            {renderPhrase(users.length)}
          </span>
          <table className="table mt-2">
            <thead>
              <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился(раз)</th>
                <th scope="col">Оценка</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <th>{user.name}</th>
                  <th>{renderBadges(user.qualities)}</th>
                  <th>{user.profession.name}</th>
                  <th>{user.completedMeetings}</th>
                  <th>{user.rate} / 5</th>
                  <th>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Users;
