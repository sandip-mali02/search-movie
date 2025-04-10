import { all, fork } from "redux-saga/effects";
import { watchGetMovieList } from "./saga/movieSaga";

const rootSaga = function* () {
  yield all([fork(watchGetMovieList)]);
};

export default rootSaga;
