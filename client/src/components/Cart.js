import React from 'react';
import ProductInCart from "./ProductInCart";

function Cart({ cart, setCart }) {
  const total = cart.reduce((previous, current) => previous + current.price, 0)

  return (
    <div>
      <p>Total: {total}</p>
      {cart.map((product) => {
        return (
          <ProductInCart key={product.id} product={product} cart={cart} setCart={setCart} />
        )
      })}      
    </div>
  );
}

export default Cart;