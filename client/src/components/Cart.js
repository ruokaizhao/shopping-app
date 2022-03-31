import React from 'react';
import { useSelector } from 'react-redux';
import ProductInCart from "./ProductInCart";

function Cart() {
  const cart = useSelector((state) => state.cart.entities)
  const total = cart.reduce((previous, current) => previous + current.price, 0)

  return (
    <div>
      <p>Total: {total}</p>
      {cart.map((product) => {
        return (
          <ProductInCart key={product.id} product={product} />
        )
      })}      
    </div>
  );
}

export default Cart;