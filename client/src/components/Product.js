import React from 'react';

function Product({ product }) {

  return (
    <div>
      <h2>{product.title}</h2>
      <h2>{product.price}</h2>
      <p>{product.rating}</p>
      <img src={product.image} alt={product.title} />
            
    </div>
  );
}

export default Product;