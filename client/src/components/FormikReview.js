import { Grid, Rating, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { reviewRemoved, reviewUpdated } from '../features/productDetailSlice';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useFormik } from "formik";
import * as Yup from "yup";

function FormikReview({ review, userId, isEditingReview, setIsEditingReview }) {
  const [isEditing, setIsEditing] = useState(false)

  const formik = useFormik({
    initialValues: {
      rating: review.rating,
      content: review.content
    },
    validationSchema: Yup.object({
      rating: Yup.string()
        .required('Required'),
      content: Yup.string()
        .min(10, 'Must be 10 characters or more')
        .required('Content is required'),
    }),
    onSubmit: () => {
      fetch(`/api/reviews/${review.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          rating: parseInt(formik.values.rating),
          content: formik.values.content
        })
      })
      .then((r) => {
        if (r.ok) {
          r.json().then((reviewReturned) => dispatch(reviewUpdated(reviewReturned)))
          setIsEditing((isEditing) => !isEditing)
        }
      })
    },
  });

  const timestamp = new Date(review.updated_at).toLocaleString();
  const currentUser = userId === review.user_id
  const dispatch = useDispatch()

  function handleEditClick() {
    setIsEditing((isEditing) => !isEditing)
    setIsEditingReview(isEditingReview => !isEditingReview)
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
      <form onSubmit={formik.handleSubmit}>
        <TextField
          sx={{width: 500, mt: 3}} 
          id="content" 
          name="content" 
          autoFocus
          value={formik.values.content} 
          onChange={formik.handleChange} 
          onBlur={formik.handleBlur}
          error={formik.touched.content && Boolean(formik.errors.content)}
          helperText={formik.touched.content && formik.errors.content}
          variant="outlined"
          label="Enter your review..."
          multiline
          rows={5}
        />
        <Grid container>
          <Grid item sx={{mt: 2, flexGrow: 1}}>
            <Rating
              id="rating"
              name="rating"
              error={formik.touched.rating && Boolean(formik.errors.rating) ? true : undefined}
              value={parseInt(formik.values.rating)}
              onChange={formik.handleChange}
            />  
          </Grid>
          <Grid item sx={{mt: 2}}>
            <Button variant="outlined" type="submit">Submit your review</Button>
          </Grid>
        </Grid>   
      </form>            
      : null}   
      </>     
  );
}

export default FormikReview;