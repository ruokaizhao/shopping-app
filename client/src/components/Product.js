import React from 'react';
import { useDispatch } from 'react-redux';
import { cartAdded } from './cartSlice';

function Product({ product, user }) {
  const dispatch = useDispatch()
  const { title, price, rating, description, image } = product

  function handleCartClick() {
    fetch("/api/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: user.id,
        title,
        price,
        rating,
        description,
        image
      })
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((data) => dispatch(cartAdded(data)))
      } else {
        r.json().then((errors) => console.log(errors))
      }
    })
  }

  return (
    <div>
      <h2>{title}</h2>
      <h2>{price}</h2>
      <p>{rating}</p>
      <img src={image} alt={title} />
      <button onClick={handleCartClick}>Add to cart</button>            
    </div>
  );
}

export default Product;