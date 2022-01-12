export default function SearchInput({ changeHandler, searchQuery }) {
    return (
        <div className="mt-3">
            <input
                className="form-control"
                type="search"
                placeholder="Search..."
                onInput={changeHandler}
                value={searchQuery}
            />
        </div>
    );
}
