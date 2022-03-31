import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartAdded, cartUpdated } from './cartSlice';

function Product({ product, user }) {
  const dispatch = useDispatch()
  const { title, price, rating, description, image } = product
  const carts = useSelector((state) => state.carts.entities)

  function handleCartClick() {
    const productTitlesInCarts = carts.map((item) => item.title)
    
    if (productTitlesInCarts.includes(product.title)) {
      const productIdInCarts = carts.find((item) => item.title === product.title).id
      const productQuantityInCarts = carts.find((item) => item.title === product.title).quantity
      fetch(`/api/carts/${productIdInCarts}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          quantity: productQuantityInCarts + 1
        })
      })
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => dispatch(cartUpdated(data)))
        } else {
          r.json().then((errors) => console.log(errors))
        }
      })
    } else {
      fetch("/api/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: user.id,
          quantity: 1,
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