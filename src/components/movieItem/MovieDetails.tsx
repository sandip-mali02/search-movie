import React, { useEffect, useState } from "react";
import { Movie } from "../../reducers/movieSlice";
import { intToRoman } from "../../utils/commonUtils";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Rating } from "@smastrom/react-rating";
import IndividualRatingCard from "./IndividualRatingCard";
import "./MovieDetails.styles.scss";

const MovieDetails = () => {
  const movieList: Array<Movie> = useSelector(
    (state: RootState) => state.movies.list
  );

  const selectedMovieId: number | undefined = useSelector(
    (state: RootState) => state.movies.selectedMovieId
  );
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>();

  useEffect(() => {
    if (movieList && selectedMovieId !== undefined) {
      const movie = movieList.find(
        (movie) => movie.episode_id === selectedMovieId
      );
      setSelectedMovie(movie);
    } else {
      setSelectedMovie(undefined);
    }
  }, [movieList, selectedMovieId]);

  const showMovieDetails = () => {
    if (selectedMovie) {
      return (
        <div className="movie-details-info" data-key={selectedMovie.episode_id}>
          <div className="movie-details-info-title">
            EPISODE {intToRoman(selectedMovie.episode_id)} -{" "}
            {selectedMovie.title}
          </div>
          <div className="movie-details-info-details">
            <img
              alt={selectedMovie.title}
              src={selectedMovie.movieDetails.Poster}
            />
            <p className="movie-details-info-details-text">
              {selectedMovie.opening_crawl}
            </p>
          </div>
          <div className="movie-details-info-director">
            Directed By : {selectedMovie.director}
          </div>

          <div className="movie-details-info-rating">
            <p>Average Rating:</p>
            <Rating
              style={{ maxWidth: 250 }}
              value={selectedMovie.average_rating}
              items={10}
              readOnly={true}
            />
          </div>
          <div className="movie-details-info-rating-individual">
            <IndividualRatingCard
              ratings={selectedMovie?.movieDetails?.Ratings}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="movie-details-info">
          <div className="movie-details-info-no-movie-selected">
            Please click on any movie for details
          </div>
        </div>
      );
    }
  };

  return <>{showMovieDetails()}</>;
};

export default MovieDetails;
