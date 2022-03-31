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
      <h2>{productInCart.title}</h2>
      <h2>{productInCart.price}</h2>
      <p>{productInCart.rating}</p>
      <img src={productInCart.image} alt={productInCart.title} />     
      <button onClick={handleRemoveCartClick}>Remove from cart</button>       
    </div>
  );
}

export default ProductInCart;