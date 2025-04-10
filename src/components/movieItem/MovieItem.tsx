import React from "react";
import { Movie, updateMoviesSelectedAction } from "../../reducers/movieSlice";
import { intToRoman } from "../../utils/commonUtils";
import { useDispatch } from "react-redux";
import { Rating } from "@smastrom/react-rating";
import "./MovieItem.styles.scss";

interface MovieItemProps {
  movie: Movie;
}

const MovieItem = ({ movie }: MovieItemProps) => {
  const dispatch = useDispatch();
  const handleOnClick = (episodeId: number) => {
    dispatch(updateMoviesSelectedAction(episodeId));
  };

  return (
    <>
      <div
        className="movie-item-info"
        data-key={movie.episode_id}
        onClick={() => {
          handleOnClick(movie.episode_id);
        }}
      >
        <div className="movie-item-info-episode">
          EPISODE {movie.episode_id}
        </div>
        <div className="movie-item-info-title">
          EPISODE {intToRoman(movie.episode_id)} - {movie.title}
        </div>
        <Rating
          className="movie-item-info-rating"
          style={{ maxWidth: 250 }}
          value={movie.average_rating}
          items={10}
          readOnly={true}
        />
        <div className="movie-item-info-release-date">{movie.release_date}</div>
      </div>
    </>
  );
};

export default MovieItem;
