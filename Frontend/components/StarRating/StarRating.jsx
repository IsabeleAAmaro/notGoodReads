import React, { useState } from "react";
import "./StarRating.css";

const StarRating = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  // Handle Click (Set Final Rating)
  const handleClick = (value) => {
    setRating(value);
    onRatingChange(value); // Send rating to parent component
  };

  // Handle Mouse Move for Half Stars
  const handleMouseMove = (event, value) => {
    const { left, width } = event.target.getBoundingClientRect();
    const xPos = event.clientX - left;
    const isHalf = xPos < width / 2;
    setHover(isHalf ? value - 0.5 : value);
  };

  // Reset Hover when Mouse Leaves
  const handleMouseLeave = () => setHover(0);

  return (
    <div className="star-rating">
      <span className="label">Score:</span>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          className={`star ${hover >= value || rating >= value ? "filled" : ""} ${hover === value - 0.5 || rating === value - 0.5 ? "half" : ""}`}
          onClick={() => handleClick(hover || value)}
          onMouseMove={(event) => handleMouseMove(event, value)}
          onMouseLeave={handleMouseLeave}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
