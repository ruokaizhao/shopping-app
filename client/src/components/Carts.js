import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarts } from './cartSlice';
import ProductInCart from "./ProductInCart";

function Cart() {
  const carts = useSelector((state) => state.carts.entities)
  const total = carts.reduce((previous, current) => previous + current.price * current.quantity, 0)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCarts())
  }, [])


  return (
    <div>
      <p>Total: {total}</p>
      {carts.map((productInCart) => {
        return (
          <ProductInCart key={productInCart.id} productInCart={productInCart} />
        )
      })}      
    </div>
  );
}

export default Cart;