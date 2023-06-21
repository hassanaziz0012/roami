import React, { useState } from 'react';
import { EmptyStar, FillStar } from '../../../Icon';

const StarRating = ({ totalStars }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <div id='rate'>
      {[...Array(totalStars)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleStarClick(index + 1)}
          style={{ cursor: 'pointer' }}
        >
          {index + 1 <= rating ? <FillStar/> : <EmptyStar/>}
        </span>
      ))}
    </div>
  );
};

export default StarRating;