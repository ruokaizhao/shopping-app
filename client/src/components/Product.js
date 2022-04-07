import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { cartAdded, cartUpdated } from '../features/cartSlice';
import "../styling/Product.css"

function Product({ product, user }) {
  const match = useRouteMatch()
  const dispatch = useDispatch()
  const { id, title, price, description, image, rating } = product
  const carts = useSelector((state) => state.carts.entities)
  console.log(rating)

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
    <div className="product">
      {match.url === "/" 
      ?
      <Link to={`products/${id}`}>
        <div className="product__info">
          <p>{title}</p>
          <p className="product__price">
            <small>$</small>
            <strong>{price}</strong>
          </p>
          <div className="product__rating">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <p>🌟</p>
              ))}
          </div>
        </div>
        <img src={image} alt="" />
      </Link> 
      : 
      <div>
        <div className="product__info">
          <p>{title}</p>
          <p className="product__price">
            <small>$</small>
            <strong>{price}</strong>
          </p>
          <div className="product__rating">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <p>🌟</p>
              ))}
          </div>
        </div>
        <img src={image} alt="" />
      </div>}             
      <button onClick={handleCartClick}>Add to cart</button>            
    </div>    
  );
}

export default Product;