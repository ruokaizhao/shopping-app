import { Box, Button, Container, Divider, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductInCart from "./ProductInCart";

function Cart({ setCartOpen }) {
  const carts = useSelector((state) => state.carts.entities)
  // To use reduce on an array of objects, the first argument cannot be the first element in the array, since it will later be used as previous
  // value, and that value cannot have keys of the containing object. So, you need to pass in a initial value of 0, to make the previous equal
  // to 0, and the second argument, current will start at index 0, and you can use dot notation to access the value in the object.
  const totalItems = carts.reduce((previous, current) => previous + current.quantity, 0)
  const totalPrice = carts.reduce((previous, current) => previous + current.price * current.quantity, 0)


  return (
    <Box sx={{ml: 5, mt: 5}}>
      {totalPrice > 0 
      ?
      <>     
        <Link to="/checkout" onClick={() => setCartOpen(false)} style={{ textDecoration: "none" }}>
          <Button variant="contained" color="secondary" sx={{mb: 2}}>
            Checkout
          </Button>
        </Link> 
        <Divider />
        <Typography sx={{mt: 2}} variant="h5">Total items: {totalItems}</Typography>      
        <Typography sx={{mb: 2}} variant="h5">Total price: ${totalPrice}</Typography> 
        <Divider sx={{mb: 2}} />            
        {carts.map((productInCart) => {
          return (
            <ProductInCart key={productInCart.id} productInCart={productInCart} />
          )
        })}
      </> 
      :
      <Container >
        <Typography variant="h4" sx={{mb:4}}>
          There is nothing in the cart.
        </Typography>
      </Container>
      }         
    </Box>
  );
}

export default Cart;