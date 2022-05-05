import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { cartRemoved, cartUpdated } from '../features/cartSlice';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Typography, Rating } from '@mui/material';

function ProductInCart({ productInCart }) {
  const dispatch = useDispatch()

  function handleMinusCartClick() {
    fetch(`/api/carts/${productInCart.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        quantity: productInCart.quantity - 1
      })
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((data) => dispatch(cartUpdated(data)))
      } else {
        r.json().then((errors) => console.log(errors))
      }
    })
  }

  function handleRemoveCartClick() {
    fetch(`/api/carts/${productInCart.id}`, {
      method: "DELETE"
    })
    .then((r) => {
      if (r.ok) {
        dispatch(cartRemoved(productInCart.id))
      } else {
        r.json().then((errors) => console.log(errors))
      }
    })
  }

  function handleAddCartClick() {
    fetch(`/api/carts/${productInCart.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        quantity: productInCart.quantity + 1
      })
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((data) => dispatch(cartUpdated(data)))
      } else {
        r.json().then((errors) => console.log(errors))
      }
    })
  }

  return (        
    <div>
      <Card sx={{ maxWidth: 350, height: 450, mb: 2 }}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe">
              <img src={productInCart.image} alt={productInCart.title} />
            </Avatar>
          }        
          title={productInCart.title}
          subheader={
              <strong>Price: ${productInCart.price}</strong>
          }
        />
        <CardMedia
          component="img"
          height="150"
          image={productInCart.image}
          alt={productInCart.title}
        />
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          <Rating name="half-rating-read" value={parseFloat(productInCart.rating)} precision={0.5} readOnly />
          <p>Items: {productInCart.quantity}</p>
          <p>Price: {productInCart.price * productInCart.quantity}</p>
        </Typography>
      </CardContent>

      <CardActions >
      {productInCart.quantity > 1 
      ? <Button variant="contained" onClick={handleMinusCartClick}>-</Button> 
      : <Button variant="contained" onClick={handleRemoveCartClick}>Remove from cart</Button>
      }
        <Button variant="contained" onClick={handleAddCartClick}>+</Button>                 
      </CardActions>          
      </Card>
    </div>             
  );
}

export default ProductInCart;