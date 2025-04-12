import React from "react";
//import { fireEvent, screen } from "@testing-library/react";
import SearchMovie from "../../components/searchMovie/SearchMovie";
import { renderWithProviders } from "../../utils/testUtils";

// Enable API mocking before tests.
describe("SearchMovie component", () => {
  beforeAll(() => {});

  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => {});

  // Disable API mocking after the tests are done.
  afterAll(() => {});

  test("Default data rendered", async () => {
    renderWithProviders(<SearchMovie />);
    /*
  expect(
    screen.getByText(/Please click on any movie for details/i)
  ).toBeInTheDocument();

  expect(screen.getByText(/EPISODE IV - A New Hope/i)).toBeInTheDocument();

  expect(
    screen.queryByText(/Directed By : George Lucas/i)
  ).not.toBeInTheDocument(); */
  });
  /*
  
test("clicked on first row and validate movie details", async () => {
    renderWithProviders(<SearchMovie />);

    const titleElement = screen.getByText("EPISODE IV - A New Hope");
    fireEvent.click(titleElement);

    expect(
      await screen.findByText("Directed By : George Lucas")
    ).toBeInTheDocument();
  });
*/
});
