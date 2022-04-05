import React, { useState } from 'react';

function Review({ review, userId, productDetail, setProductDetail }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    rating: "",
    content: ""
  })
  const currentUser = userId === review.user_id

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
        rating: formData.rating,
        content: formData.content
      })
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((reviewReturned) => setProductDetail({...productDetail, reviews: productDetail.reviews.map((data) => {
          if (data.id === review.id) {
            return reviewReturned
          } else {
            return data
          }
        })}))
        setFormData({
          rating: "",
          content: ""
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
        setProductDetail({...productDetail, reviews: productDetail.reviews.filter((data) => {
          return data.id !== review.id
        })})
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
          <input type="radio" id="review_rating1" name="rating" value={1} />
          <label htmlFor="review_rating1">1</label><br/>
          
          <input type="radio" id="review_rating2" name="rating" value={2} />
          <label htmlFor="review_rating2">2</label><br/>
        
          <input type="radio" id="review_rating3" name="rating" value={3} />
          <label htmlFor="review_rating3">3</label><br/>
          
          <input type="radio" id="review_rating4" name="rating" value={4} />
          <label htmlFor="review_rating4">4</label><br/>
          
          <input type="radio" id="review_rating5" name="rating" value={5} />
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