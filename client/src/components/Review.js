import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { reviewRemoved, reviewUpdated } from './productDetailSlice';

function Review({ review, userId }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    rating: "",
    content: review.content
  })
  const [defaultReviewRating, setDefaultReviewRating] = useState("")
  const currentUser = userId === review.user_id
  const dispatch = useDispatch()

  function handleEditClick() {
    setIsEditing((isEditing) => !isEditing)
    setDefaultReviewRating(review.rating)
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
        rating: formData.rating,
        content: formData.content
      })
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((reviewReturned) => dispatch(reviewUpdated(reviewReturned.id)))
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
        <div onChange={handleChange}>       
          <input type="radio" id="review_rating1" name="rating" value={1} defaultChecked={defaultReviewRating === 1}/>
          <label htmlFor="review_rating1">1</label><br/>
          
          <input type="radio" id="review_rating2" name="rating" value={2} defaultChecked={defaultReviewRating === 2}/>
          <label htmlFor="review_rating2">2</label><br/>
        
          <input type="radio" id="review_rating3" name="rating" value={3} defaultChecked={defaultReviewRating === 3}/>
          <label htmlFor="review_rating3">3</label><br/>
          
          <input type="radio" id="review_rating4" name="rating" value={4} defaultChecked={defaultReviewRating === 4}/>
          <label htmlFor="review_rating4">4</label><br/>
          
          <input type="radio" id="review_rating5" name="rating" value={5} defaultChecked={defaultReviewRating === 5}/>
          <label htmlFor="review_rating5">5</label><br/>
        </div>

        <label htmlFor="review_content">Enter your review:</label><br/>
        <textarea id="review_content" name="content" value={formData.content} onChange={handleChange}/><br/>
        
        <button type="submit">Submit your review</button>
      </form>
      : null}     
    </div>
  );
}

export default Review;