import { Movie, Ratings } from "../reducers/movieSlice";

const calculateAverageRating = (ratings: Array<Ratings>) => {
  let sumOfRatings = 0.0;
  ratings.forEach((review) => {
    sumOfRatings += getReviewInPercentage(review.Value);
  });
  return sumOfRatings / ratings.length / 10 || 0;
};

const getReviewInPercentage = (value: string) => {
  if (value.includes("%")) {
    return parseFloat(value.replace("%", ""));
  } else {
    const splitArray = value.split("/");
    const floatValue = (
      (parseFloat(splitArray[0]) / parseFloat(splitArray[1])) *
      100
    ).toFixed(2);
    return parseFloat(floatValue);
  }
};

function intToRoman(num: number) {
  if (typeof num !== "number" || num <= 0 || num > 3999) {
    return "Invalid number";
  }

  const romanSymbols = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" },
  ];

  let romanNumber = "";

  for (let i = 0; i < romanSymbols.length; i++) {
    while (num >= romanSymbols[i].value) {
      romanNumber += romanSymbols[i].symbol;
      num -= romanSymbols[i].value;
    }
  }

  return romanNumber;
}

const sortArray = (array: Array<Movie>, sortBy: string): Array<Movie> => {
  const sortedArray = array.sort((a, b) => {
    const aFieldValue =
      //@ts-ignore
      (a[sortBy].toUpperCase && a[sortBy].toUpperCase()) || a[sortBy];
    const bFieldValue =
      //@ts-ignore
      (b[sortBy].toUpperCase && b[sortBy].toUpperCase()) || b[sortBy];

    if (aFieldValue < bFieldValue) {
      return -1;
    }
    if (aFieldValue > bFieldValue) {
      return 1;
    }
    return 0;
  });
  return sortedArray;
};

export { calculateAverageRating, getReviewInPercentage, intToRoman, sortArray };
