import React, { useEffect, useState } from "react";
import { Movie } from "../../reducers/movieSlice";
import { sortArray } from "../../utils/commonUtils";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import "./MovieList.styles.scss";
import MovieItem from "../movieItem/MovieItem";
import MovieDetails from "../movieItem/MovieDetails";

const MovieList = () => {
  const [updatedMovieList, setUpdatedMovieList] = useState<Array<Movie>>([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const movieList: Array<Movie> =
    useSelector((state: RootState) => state.movies.list) || [];

  const sortBy: string = useSelector((state: RootState) => state.movies.sortBy);
  const errors: string = useSelector((state: RootState) => state.movies.errors);

  const searchText: string = useSelector(
    (state: RootState) => state.movies.searchText
  );

  useEffect(() => {
    let filteredMovieList = movieList;
    if (searchText.length > 2) {
      filteredMovieList = movieList.filter((movie) => {
        const searchTextLowerCase = searchText.toLowerCase();
        //@ts-ignore
        const fieldValue = movie.title.toLowerCase();
        if (fieldValue.includes(searchTextLowerCase)) {
          return true;
        }
        return false;
      });
    }
    if (sortBy) {
      filteredMovieList = sortArray(
        JSON.parse(JSON.stringify(filteredMovieList)),
        sortBy
      );
    }
    setUpdatedMovieList(filteredMovieList);
  }, [movieList, sortBy, searchText]);

  const loadMovieDetails = () => {
    return updatedMovieList?.map((item, index) => (
      <li key={index}>
        <MovieItem movie={item} />
      </li>
    ));
  };

  return (
    <div className="movie-container">
      <div className="error-div">{errors}</div>
      <div className="movie-list-details-container">
        <div className="movie-list">
          <ul> {loadMovieDetails()}</ul>
        </div>
        <div className="movie-details">
          <MovieDetails />
        </div>
      </div>
    </div>
  );
};

export default MovieList;
