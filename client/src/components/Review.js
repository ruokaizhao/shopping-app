import { Box, Rating } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { reviewRemoved, reviewUpdated } from '../features/productDetailSlice';

function Review({ review, userId, isEditingReview, setIsEditingReview }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    rating: review.rating,
    content: review.content
  })
  const currentUser = userId === review.user_id
  const dispatch = useDispatch()

  function handleEditClick() {
    setIsEditing((isEditing) => !isEditing)
    setIsEditingReview((isEditingReview) => !isEditingReview)
  }

  function handleChange(e) {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  function handleReviewSubmit(e) {
    e.preventDefault()
    fetch(`/api/reviews/${review.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        rating: parseInt(formData.rating),
        content: formData.content
      })
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((reviewReturned) => dispatch(reviewUpdated(reviewReturned)))
        setIsEditing((isEditing) => !isEditing)
        setIsEditingReview((isEditingReview) => !isEditingReview)
      }
    })
  }

  function handleDeleteClick() {
    fetch(`/api/reviews/${review.id}`, {
      method: "DELETE"
    })
    .then((r) => {
      if (r.ok) {
        dispatch(reviewRemoved(review.id))
      }
    })
  }

  return (
    <Box
    sx={{
      mt: 4,
      mb: 4,
      border: '1px outset',
      padding: 1
    }}>
      <span>{review.name}</span>
      <span>{review.updated_at}</span>
      <Rating name="half-rating-read" value={parseFloat(review.rating)} precision={0.5} readOnly />
      <p>{review.content}</p>
      {currentUser ? 
      <div>
        <button onClick={handleEditClick}>Edit</button> 
        <button onClick={handleDeleteClick}>Delete</button> 
      </div>
      : null}
      {isEditing ? 
       <form onSubmit={handleReviewSubmit}> 
        <Rating
          name="rating"
          defaultValue={parseInt(formData.rating)}
          onChange={handleChange}
        />

        <label htmlFor="review_content">Enter your review:</label><br/>
        <textarea id="review_content" name="content" defaultValue={formData.content} onChange={handleChange}/><br/>
        
        <button type="submit">Submit your review</button>
      </form>
      : null} 
    </Box>
  );
}

export default Review;