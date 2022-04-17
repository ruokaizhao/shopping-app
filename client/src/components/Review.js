import { Grid, Rating, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { reviewRemoved, reviewUpdated } from '../features/productDetailSlice';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Review({ review, userId }) {
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
    <>    
      <Card sx={{ width: 500 }} variant="outlined">
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
        </CardActions>
      </Card>
      {isEditing ? 
      <>
        <TextField
        sx={{width: 500, mt: 3}} 
        id="review_content" 
        name="content" 
        autoFocus
        value={formData.content} 
        onChange={handleChange} 
        variant="outlined"
        label="Enter your review..."
        multiline
        rows={5} />
        <Grid container>
          <Grid item sx={{mt: 2, flexGrow: 1}}>
            <Rating
            name="rating"
            value={parseInt(formData.rating)}
            onChange={(handleChange)}
            />  
          </Grid>
          <Grid item sx={{mt: 2}}>
            <Button variant="outlined" type="submit" onClick={handleReviewSubmit}>Submit your review</Button>
          </Grid>
        </Grid>   
      </>            
      : null}   
      </>     
  );
}

export default Review;