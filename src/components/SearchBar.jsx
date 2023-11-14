const SearchBar = ({ setSearchQuery }) => {
    const _handleChange = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
    }

    return (
        <div>
            <input type="text" onChange={_handleChange} placeholder="Search..." />
        </div>
    )
}

export default SearchBar;