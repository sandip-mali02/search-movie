import { Movie, Ratings } from "../../reducers/movieSlice";
import {
  calculateAverageRating,
  getReviewInPercentage,
  intToRoman,
  sortArray,
} from "../../utils/commonUtils";
import { moviesList } from "../testData/MoviesData";

describe("Test intToRoman function", () => {
  test("number less than 10", () => {
    expect(intToRoman(5)).toEqual("V");
    expect(intToRoman(9)).toEqual("IX");
  });
  test("number greater than 50", () => {
    expect(intToRoman(50)).toEqual("L");
    expect(intToRoman(98)).toEqual("XCVIII");
  });
});

describe("sortArray function", () => {
  test("sort episode_id", () => {
    const moviesListCloned = JSON.parse(JSON.stringify(moviesList));
    let initial_eposideIds = moviesListCloned.map(
      ({ episode_id }: Movie) => episode_id
    );

    const sortedMovieDetails = sortArray(moviesListCloned, "episode_id");
    let sorted_episode_id = sortedMovieDetails.map(
      ({ episode_id }: Movie) => episode_id
    );

    expect(initial_eposideIds).toStrictEqual([4, 5, 6, 1, 2, 3]);

    expect(sorted_episode_id).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("sort title", () => {
    const moviesListCloned = JSON.parse(JSON.stringify(moviesList));
    let initial_title = moviesListCloned.map(({ title }: Movie) => title);

    const sortedMovieDetails = sortArray(moviesListCloned, "title");

    let sorted_title = sortedMovieDetails.map(({ title }: Movie) => title);

    expect(initial_title).toStrictEqual([
      "A New Hope",
      "The Empire Strikes Back",
      "Return of the Jedi",
      "The Phantom Menace",
      "Attack of the Clones",
      "Revenge of the Sith",
    ]);

    expect(sorted_title).toEqual([
      "A New Hope",
      "Attack of the Clones",
      "Return of the Jedi",
      "Revenge of the Sith",
      "The Empire Strikes Back",
      "The Phantom Menace",
    ]);
  });

  test("sort average rating", () => {
    const moviesListCloned = JSON.parse(JSON.stringify(moviesList));
    let initial_average_rating = moviesListCloned.map(
      ({ average_rating }: Movie) => average_rating
    );

    const sortedMovieDetails = sortArray(moviesListCloned, "average_rating");
    let sorted_title = sortedMovieDetails.map(
      ({ average_rating }: Movie) => average_rating
    );

    expect(initial_average_rating).toStrictEqual([
      0, 8.8, 7.433333333333333, 7, 0, 0,
    ]);

    expect(sorted_title).toEqual([0, 0, 0, 7, 7.433333333333333, 8.8]);
  });
});

describe("calculateAverageRating function", () => {
  test("calculateAverageRating with 3 ratings", () => {
    const ratings: Array<Ratings> = [
      {
        Source: "Internet Movie Database",
        Value: "8.3/10",
      },
      {
        Source: "Rotten Tomatoes",
        Value: "82%",
      },
      {
        Source: "Metacritic",
        Value: "58/100",
      },
    ];
    const averageRatings = calculateAverageRating(ratings);

    expect(averageRatings).toBe(7.433333333333333);
  });
  test("calculateAverageRating with 1 ratings", () => {
    const ratings: Array<Ratings> = [
      {
        Source: "Internet Movie Database",
        Value: "8.3/10",
      },
    ];
    const averageRatings = calculateAverageRating(ratings);

    expect(averageRatings).toBe(8.3);
  });
});

describe("getReviewInPercentage", () => {
  test("getReviewInPercentage with Source: Internet Movie Database", () => {
    const ratings: Ratings = {
      Source: "Internet Movie Database",
      Value: "8.3/10",
    };
    const averageRatings = getReviewInPercentage(ratings.Value);

    expect(averageRatings).toBe(83);
  });
  test("getReviewInPercentage with Source: Rotten Tomatoes", () => {
    const ratings: Ratings = {
      Source: "Rotten Tomatoes",
      Value: "82%",
    };
    const averageRatings = getReviewInPercentage(ratings.Value);

    expect(averageRatings).toBe(82);
  });
  test("getReviewInPercentage with Source: Metacritic", () => {
    const ratings: Ratings = {
      Source: "Metacritic",
      Value: "58/100",
    };
    const averageRatings = getReviewInPercentage(ratings.Value);

    expect(averageRatings).toBe(58);
  });
});
