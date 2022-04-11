import React, { useState } from 'react';
import Review from "./Review";
import { reviewAdded } from "../features/productDetailSlice";
import { useDispatch, useSelector } from 'react-redux';
import { Rating } from '@mui/material';

function Reviews({ userId }) {
  const [formData, setFormData] = useState({
    rating: "",
    content: ""
  })
  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.productDetails.entities)

  function handleChange(e) {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  function handleReviewSubmit(e) {
    e.preventDefault()
    fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        user_id: userId,
        product_id: productDetails.id,
        rating: parseInt(formData.rating),
        content: formData.content
      })
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((review) => dispatch(reviewAdded(review)))
      }
      setFormData({
        rating: "",
        content: ""
      })
    })
  }

  return (
    <div>
      {productDetails.reviews.map((review) => {
        return (
          <Review key={review.id} review={review} userId={userId} />
        )
      })}
      <form onSubmit={handleReviewSubmit}> 
        <Rating
            name="rating"
            value={parseInt(formData.rating)}
            onChange={(handleChange)}
        />
        <br/>

        <label htmlFor="review_content">Enter your review:</label><br/>
        <textarea id="review_content" name="content" value={formData.content} onChange={handleChange}/><br/>
        
        <button type="submit">Submit your review</button>
      </form>      
    </div>
  );
}

export default Reviews;