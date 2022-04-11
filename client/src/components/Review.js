import { Rating } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { reviewRemoved, reviewUpdated } from '../features/productDetailSlice';

function Review({ review, userId }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    rating: "",
    content: review.content
  })
  const currentUser = userId === review.user_id
  const dispatch = useDispatch()

  function handleEditClick() {
    setIsEditing((isEditing) => !isEditing)
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
        setFormData({
          rating: "",
          content: formData.content
        })
        setIsEditing((isEditing) => !isEditing)
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
    <div>
      <p>{review.name}</p>
      <p>{review.updated_at}</p>
      <p>{review.rating}</p>
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
          value={parseInt(formData.rating)}
          onChange={handleChange}
        />

        <label htmlFor="review_content">Enter your review:</label><br/>
        <textarea id="review_content" name="content" defaultValue={formData.content} onChange={handleChange}/><br/>
        
        <button type="submit">Submit your review</button>
      </form>
      : null}     
    </div>
  );
}

export default Review;