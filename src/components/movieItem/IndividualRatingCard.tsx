import React from "react";
import { Ratings } from "../../reducers/movieSlice";
import { getReviewInPercentage } from "../../utils/commonUtils";
import "./IndividualRatingCard.styles.scss";

interface IndividualRatingCardProps {
  ratings: Array<Ratings>;
}

const IndividualRatingCard = ({ ratings }: IndividualRatingCardProps) => {
  const showIndividualRatingCard = () => {
    return ratings.map((rating: Ratings) => {
      return (
        <div className="individual-rating-card" key={rating.Source}>
          <span>
            {rating.Source}: {getReviewInPercentage(rating.Value)}
          </span>
        </div>
      );
    });
  };

  return <>{showIndividualRatingCard()}</>;
};

export default IndividualRatingCard;
