export default function Bookmark({ onFavorite, renderBookmark, user }) {
  return (
    <>
      <span
        className="btn btn-light"
        onClick={() => onFavorite(!user.isFavorite, user._id)}
      >
        {renderBookmark(user.isFavorite)}
      </span>
    </>
  );
}
