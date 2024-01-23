import React from "react";
import { FaStar } from "react-icons/fa";
import s from "./stars.module.css";

const StarRating = ({ rating }) => {
  const roundedRating = Math.round(rating * 2) / 2;

  const stars = Array.from({ length: 5 }, (_, index) => (
    <FaStar
      key={index}
      className={index < roundedRating ? s.filled : s.empty}
    />
  ));

  return <div className={s.star_rating}>{stars}</div>;
};

export default StarRating;
