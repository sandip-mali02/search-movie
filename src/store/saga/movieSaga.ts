import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  Movie,
  MovieDetails,
  getMoviesListErrorAction,
  getMoviesListSuccessAction,
} from "../../reducers/movieSlice";
import { filmApiEndPoint, filmDetailsApiEndPoint } from "../../constants/apis";
import { calculateAverageRating } from "../../utils/commonUtils";

export const GET_MOVIES_LIST = "movies/getMoviesList";
interface FetchFilmsAPIResponse {
  count: number;
  next: null;
  previous: null;
  results: Array<Movie>;
}

const fetchMoviesData = async () => {
  const result = await fetch(`${filmApiEndPoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
  return result;
};

const fetchMovieDetails = async (title: string) => {
  const result = await fetch(`${filmDetailsApiEndPoint}&t=${title}&r=json`)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
  return result;
};

function* getMoviesList() {
  try {
    const response: FetchFilmsAPIResponse = yield call(fetchMoviesData);
    const data = response.results;
    const movieDetailsArray: MovieDetails[] = yield all(
      data.map((movie) => call(fetchMovieDetails, movie.title))
    );
    data.forEach((movie) => {
      const movieDetails = movieDetailsArray.find((movieDetails) =>
        movieDetails.Title.includes(movie.title)
      );
      if (movieDetails) {
        movie.movieDetails = movieDetails;
        movie.average_rating = calculateAverageRating(movieDetails.Ratings);
      }
    });
    yield put(getMoviesListSuccessAction(JSON.parse(JSON.stringify(data))));
  } catch (error) {
    yield put(getMoviesListErrorAction(error as string));
  }
}

export function* watchGetMovieList() {
  yield takeLatest(GET_MOVIES_LIST, getMoviesList);
}
