import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Movie {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: Array<string>;
  planets: Array<string>;
  starships: Array<string>;
  vehicles: Array<string>;
  species: Array<string>;
  created: string;
  edited: string;
  url: string;
  totalSeasons?: number;
  average_rating: number;
  movieDetails: MovieDetails;
}

export type Ratings = {
  Source: string;
  Value: string;
};

export interface MovieDetails {
  Title: string;
  Year: number | string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<Ratings>;
  Metascore: number | string;
  imdbRating: number | string;
  imdbVotes: number | string;
  imdbID: string;
  Type: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  totalSeasons?: number | string;
  Website?: string;
  Response?: boolean | string;
}

interface MoviesInitialStateType {
  list: Movie[];
  loading: boolean;
  errors: string;
  selectedMovieId: number | undefined;
  sortBy: string;
  searchText: string;
}

interface SearchDataPayloadProps {
  sortBy: string;
  searchText: string;
}

const initialState: MoviesInitialStateType = {
  list: [],
  loading: false,
  errors: "",
  selectedMovieId: undefined,
  sortBy: "",
  searchText: "",
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getMoviesList: (state: MoviesInitialStateType) => {
      state.loading = true;
      state.errors = "";
    },
    getMoviesListSuccessAction: (
      state: MoviesInitialStateType,
      { payload: list }: PayloadAction<Movie[]>
    ) => {
      state.list = list;
      state.loading = false;
      state.errors = "";
    },
    updateMoviesSelectedAction: (
      state: MoviesInitialStateType,
      { payload: eposideId }: PayloadAction<number>
    ) => {
      //state.list = [];
      //state.loading = false;
      state.selectedMovieId = eposideId;
    },
    getMoviesListErrorAction: (
      state: MoviesInitialStateType,
      { payload: error }: PayloadAction<string>
    ) => {
      state.list = [];
      state.loading = false;
      state.errors = error;
    },
    updateSearchData: (
      state: MoviesInitialStateType,
      { payload: searchDataPayload }: PayloadAction<SearchDataPayloadProps>
    ) => {
      state.sortBy = searchDataPayload.sortBy;
      state.searchText = searchDataPayload.searchText;
      state.selectedMovieId = undefined;
    },
  },
});

export const {
  getMoviesListSuccessAction,
  getMoviesListErrorAction,
  updateMoviesSelectedAction,
  getMoviesList,
  updateSearchData,
} = movieSlice.actions;

export default movieSlice.reducer;
