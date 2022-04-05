import React from 'react';
import Review from "./Review";

function Reviews({ reviews }) {
  return (
    <div>
      {reviews.map((review) => {
        return (
          <Review key={review.id} review={review} />
        )
      })}      
    </div>
  );
}

export default Reviews;