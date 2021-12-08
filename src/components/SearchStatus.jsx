export default function SearchStatus({ phrase, length }) {
  return <span className="badge fs-4 bg-primary p-2">{phrase(length)}</span>;
}
