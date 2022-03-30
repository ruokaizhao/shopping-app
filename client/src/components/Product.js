import React from 'react';

function Product({ product, cart, setCart }) {

  function handleCartClick() {
    setCart([...cart, product])
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