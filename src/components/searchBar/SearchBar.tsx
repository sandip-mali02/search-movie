import React, { useEffect, useState } from "react";
import { updateSearchData } from "../../reducers/movieSlice";
import { useDispatch } from "react-redux";
import "./SearchBar.styles.scss";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  const onSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };
  const onSearchByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };
  useEffect(() => {
    dispatch(updateSearchData({ sortBy, searchText }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, searchText]);

  return (
    <div className="search-bar">
      <form>
        <select
          name="sortBy"
          value={sortBy}
          id="sortBy"
          onChange={onSortByChange}
        >
          <option value="">Sort By</option>
          <option value="title">Film Title</option>
          <option value="episode_id">Episode</option>
          <option value="release_date">Release Date</option>
          <option value="average_rating">Rating</option>
        </select>
        <input
          type="search"
          value={searchText}
          name="search"
          id="search"
          onChange={onSearchByChange}
        />
      </form>
    </div>
  );
};

export default SearchBar;
