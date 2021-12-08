import Bookmark from "./Bookmark";
import Qualities from "./Qualities";
export default function User({
  user,
  onDelete,
  renderBadges,
  renderBookmark,
  onFavorite,
}) {
  return (
    <>
      <tr key={user._id}>
        <th>{user.name}</th>
        <th>
          <Qualities qualities={user.qualities} badges={renderBadges} />
        </th>
        <th>{user.profession.name}</th>
        <th>{user.completedMeetings}</th>
        <th>
          <Bookmark
            onFavorite={onFavorite}
            user={user}
            renderBookmark={renderBookmark}
          />
        </th>
        <th>{user.rate} / 5</th>
        <th>
          <button className="btn btn-danger" onClick={() => onDelete(user._id)}>
            Delete
          </button>
        </th>
      </tr>
    </>
  );
}
