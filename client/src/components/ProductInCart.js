import React from 'react';
import { useDispatch } from 'react-redux';
import { cartRemoved, cartUpdated } from './cartSlice';

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

  return (
    <div>
      <h2>Title: {productInCart.title}</h2>
      <h2>Price: {productInCart.price}</h2>
      <h2>Quantity: {productInCart.quantity}</h2>
      <p>{productInCart.rating}</p>
      <img src={productInCart.image} alt={productInCart.title} />
      {productInCart.quantity > 1 
      ? <button onClick={handleMinusCartClick}>-</button>
      : <button onClick={handleRemoveCartClick}>Remove from cart</button>
      }             
    </div>
  );
}

export default ProductInCart;