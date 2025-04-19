import React, { useEffect } from "react";
import { getMoviesList } from "../../reducers/movieSlice";
import { useDispatch } from "react-redux";
import MovieList from "../movieList/MovieList";
import SearchBar from "../searchBar/SearchBar";

const MovieDetails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMoviesList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="movie-container">
      <SearchBar />
      <MovieList />
    </div>
  );
};

export default MovieDetails;
