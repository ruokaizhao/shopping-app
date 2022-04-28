import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductInCart from "./ProductInCart";

function Cart() {
  const carts = useSelector((state) => state.carts.entities)
  // To use reduce on an array of objects, the first argument cannot be the first element in the array, since it will later be used as previous
  // value, and that value cannot have keys of the containing object. So, you need to pass in a initial value of 0, to make the previous equal
  // to 0, and the second argument, current will start at index 0, and you can use dot notation to access the value in the object.
  const totalItems = carts.reduce((previous, current) => previous + current.quantity, 0)
  const totalPrice = carts.reduce((previous, current) => previous + current.price * current.quantity, 0)


  return (
    <Box sx={{ml: 5}}>
      {totalPrice > 0 
      ?
      <>     
        <Link to="/checkout">
          <Button variant="contained" color="secondary" sx={{marginBottom: 4}}>
            Checkout
          </Button>
        </Link> 
        <Typography variant="h4">Total items: {totalItems}</Typography> 
        <Typography sx={{mb: 2}} variant="h4">Total price: ${totalPrice}</Typography> 
        
        {carts.map((productInCart) => {
          return (
            <ProductInCart key={productInCart.id} productInCart={productInCart} />
          )
        })}
      </> 
      :
      <Typography variant="h4" sx={{mb:4}}>
        There is nothing in the cart.
      </Typography>}
         
      </Box>
  );
}

export default Cart;