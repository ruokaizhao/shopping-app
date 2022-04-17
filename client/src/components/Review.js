import { Box, Rating } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { reviewRemoved, reviewUpdated } from '../features/productDetailSlice';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Review({ review, userId, isEditingReview, setIsEditingReview }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    rating: review.rating,
    content: review.content
  })

  const timestamp = new Date(review.updated_at).toLocaleString();
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
    <Card sx={{ width: 600 }} variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {review.name}         
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>      
          <Rating name="half-rating-read" size="small" value={parseFloat(review.rating)} precision={0.5} readOnly />
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>      
          {timestamp}
        </Typography>        
        <Typography sx={{overflowWrap: "break-word"}}>
          {review.content}          
        </Typography>      
      </CardContent>
      <CardActions>
        {currentUser ? 
        <div>
          <Button onClick={handleEditClick}>Edit</Button>
          <Button onClick={handleDeleteClick}>Delete</Button>
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
      </CardActions>
    </Card>
  );
}

export default Review;