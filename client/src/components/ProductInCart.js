import React from 'react';
import { useDispatch } from 'react-redux';
import { cartRemoved } from './cartSlice';

function ProductInCart({ productInCart }) {
  const dispatch = useDispatch()

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
      <button onClick={handleRemoveCartClick}>Remove from cart</button>       
    </div>
  );
}

export default ProductInCart;