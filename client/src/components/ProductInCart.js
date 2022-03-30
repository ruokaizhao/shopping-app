import React from 'react';

function ProductInCart({ product, cart, setCart }) {

  function handleRemoveCartClick() {
    const newCart = cart.filter((item) => item.id !== product.id)
    setCart(newCart)
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