import SearchStatus from "./SearchStatus";
import User from "./User";

export default function Users({ users, renderPhrase, ...props }) {
  return (
    <>
      {users.length === 0 ? (
        <SearchStatus phrase={renderPhrase} length={users.length} />
      ) : (
        <div>
          <SearchStatus phrase={renderPhrase} length={users.length} />
          <table className="table mt-2">
            <thead>
              <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился(раз)</th>
                <th scope="col">Избранное</th>
                <th scope="col">Оценка</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <User key={user._id} user={user} {...props} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
