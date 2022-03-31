import React from 'react';
import { useSelector } from 'react-redux';
import ProductInCart from "./ProductInCart";

function Cart() {
  const carts = useSelector((state) => state.carts.entities)
  const total = carts.reduce((previous, current) => previous + current.price * current.quantity, 0)


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