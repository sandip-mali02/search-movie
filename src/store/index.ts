import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./root-saga";
import movieReducer from "../reducers/movieSlice";

const sagaMiddleWare = createSagaMiddleware();

const rootReducer = combineReducers({
  movies: movieReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleWare),
});
sagaMiddleWare.run(rootSaga);

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;

export default store;
