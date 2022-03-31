import React from 'react';
import { useDispatch } from 'react-redux';
import { itemRemoved } from './cartSlice';

function ProductInCart({ product }) {
  const dispatch = useDispatch()

  function handleRemoveCartClick() {
    dispatch(itemRemoved(product.id))
  }

  return (
    <div>
      <h2>{product.title}</h2>
      <h2>{product.price}</h2>
      <p>{product.rating}</p>
      <img src={product.image} alt={product.title} />     
      <button onClick={handleRemoveCartClick}>Remove from cart</button>       
    </div>
  );
}

export default ProductInCart;