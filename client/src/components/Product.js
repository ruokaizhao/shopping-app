import React from 'react';
import { useDispatch } from 'react-redux';
import { itemAdded } from './cartSlice';

function Product({ product }) {
  const dispatch = useDispatch()

  function handleCartClick() {
    dispatch(itemAdded(product))
  }

  return (
    <div>
      <h2>{product.title}</h2>
      <h2>{product.price}</h2>
      <p>{product.rating}</p>
      <img src={product.image} alt={product.title} />
      <button onClick={handleCartClick}>Add to cart</button>            
    </div>
  );
}

export default Product;