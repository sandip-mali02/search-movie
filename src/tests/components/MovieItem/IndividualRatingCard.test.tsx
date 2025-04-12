import React from "react";
import { render, screen } from "@testing-library/react";
// We're using our own custom render function and not RTL's render.'
import IndividualRatingCard from "../../../components/movieItem/IndividualRatingCard";
import { Ratings } from "../../../reducers/movieSlice";

describe("IndividualRatingCard", () => {
  beforeEach(() => {});
  afterEach(() => {});

  test("Show all three ratings", async () => {
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

    render(<IndividualRatingCard ratings={ratings} />);

    expect(
      screen.getByText("Internet Movie Database: 83%")
    ).toBeInTheDocument();
    expect(screen.getByText("Rotten Tomatoes: 82%")).toBeInTheDocument();
    expect(screen.getByText("Metacritic: 58%")).toBeInTheDocument();
  });

  test("No rating all three ratings", () => {
    const ratings: Array<Ratings> = [];

    render(<IndividualRatingCard ratings={ratings} />);

    expect(
      screen.queryByText("Internet Movie Database: 78%")
    ).not.toBeInTheDocument();

    expect(screen.queryByText("Rotten Tomatoes: 93%")).not.toBeInTheDocument();
  });
});
