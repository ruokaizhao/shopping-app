import React, { useState } from 'react';
import Review from "./Review";
import { reviewAdded } from "../features/productDetailSlice";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Rating, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import FormikReview from './FormikReview';

function Reviews({ userId }) {
  const [isEditingReview, setIsEditingReview] = useState(false)
  const [formData, setFormData] = useState({
    rating: "",
    content: ""
  })
  const [errors, setErrors] = useState([])
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
        r.json().then((review) => {
          dispatch(reviewAdded(review))
          setFormData({
            rating: "",
            content: ""
          })
          setErrors([])
        })
      } else {
        r.json().then((err) => setErrors([...err.errors]))
      }      
    })
  }

  return (
      <Box>
        <Typography variant="h4" >
          Reviews
        </Typography>
        {productDetails.reviews.map((review) => {
          return (
            // <Review key={review.id} review={review} userId={userId} setIsEditingReview={setIsEditingReview} />
            <FormikReview key={review.id} review={review} userId={userId} setIsEditingReview={setIsEditingReview} />
          )
        })}
        <Button sx={{mt: 3}} onClick={() => setIsEditingReview((isEditingReview) => !isEditingReview)}>
          {isEditingReview ? "Cancel" : "Start a new review?"}
        </Button><br/>
        {isEditingReview
        ?
        <>
          <TextField 
            sx={{width: 500, mt: 3, mb: 2}} 
            id="review_content" 
            name="content" 
            autoFocus
            value={formData.content} 
            onChange={handleChange} 
            variant="outlined"
            label="Enter your review..."
            multiline
            rows={5}/><br/>
          {errors.length !== 0 
          ?
          errors.map((error) => {
            return (
              <Typography color="red">{error}</Typography>
            )
          })
          : null}
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
        :null}        
      </Box>
  );
}

export default Reviews;