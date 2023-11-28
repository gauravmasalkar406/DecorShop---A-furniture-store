import React from "react";
import { FaStar } from "react-icons/fa";
import "./stars.css";

const StarRating = ({ rating }) => {
  const roundedRating = Math.round(rating * 2) / 2;

  const stars = Array.from({ length: 5 }, (_, index) => (
    <FaStar
      key={index}
      className={index < roundedRating ? "filled" : "empty"}
    />
  ));

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
