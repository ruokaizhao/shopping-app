import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { cartAdded, cartUpdated } from '../features/cartSlice';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, Rating, CardActionArea } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function Product({ product, user }) {
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  const match = useRouteMatch()
  const dispatch = useDispatch()
  const { id, title, price, description, image, rating } = product
  const carts = useSelector((state) => state.carts.entities)

  function handleCartClick() {
    const productTitlesInCarts = carts.map((item) => item.title)
    
    if (productTitlesInCarts.includes(product.title)) {
      const productIdInCarts = carts.find((item) => item.title === product.title).id
      const productQuantityInCarts = carts.find((item) => item.title === product.title).quantity
      fetch(`/api/carts/${productIdInCarts}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          quantity: productQuantityInCarts + 1
        })
      })
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            dispatch(cartUpdated(data))
            setIsAddedToCart((isAddedToCart) => !isAddedToCart)
            setTimeout(() => {
              setIsAddedToCart((isAddedToCart) => !isAddedToCart)
            }, 2000)
          })
        } else {
          r.json().then((errors) => console.log(errors))
        }
      })
    } else {
      fetch("/api/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: user.id,
          quantity: 1,
          title,
          price,
          description,
          image
        })
      })
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            dispatch(cartAdded(data))
            setIsAddedToCart((isAddedToCart) => !isAddedToCart)
            setTimeout(() => {
              setIsAddedToCart((isAddedToCart) => !isAddedToCart)
            }, 2000)
          })
        } else {
          r.json().then((errors) => console.log(errors))
        }
      })
    }    
  }

  return (
    <div>
      {match.url === "/" 
      ?
      <Card sx={{ height: 600 }} variant="outlined">
        <CardActionArea >        
          <Link to={`products/${id}`}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe">
                  <img src={image} alt={title} />
                </Avatar>
              }        
              title={title}
              subheader={
                  <strong>Price: ${price}</strong>
              }
            />
            <CardMedia
              component="img"
              height="300"
              image={image}
              alt={title}
            />
          </Link>
        </CardActionArea>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <Rating name="half-rating-read" value={parseFloat(rating)} precision={0.5} readOnly /><br/>
            {isAddedToCart 
            ?
            <strong>The item has been added to cart.</strong>
            : null} 
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add shopping cart" onClick={handleCartClick} >
            <AddShoppingCartIcon />
          </IconButton>       
        </CardActions>          
      </Card>
      : 
      <div>
        <Card sx={{ width: 600, height: 600 }}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe">
                <img src={image} alt={title} />
              </Avatar>
            }        
            title={title}
            subheader={
                <strong>Price: ${price}</strong>
            }
          />
          <CardMedia
            component="img"
            height="300"
            image={image}
            alt={title}
          />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <Rating name="half-rating-read" value={parseFloat(rating)} precision={0.5} readOnly /><br/>
            {isAddedToCart 
            ?
            <strong>The item has been added to cart.</strong>
            : null}            
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add shopping cart" onClick={handleCartClick} >
            <AddShoppingCartIcon />
          </IconButton>       
        </CardActions>          
      </Card>
      </div>}           
    </div>    
  );
}
export default Product;