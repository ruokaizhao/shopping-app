import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { cartRemoved } from '../features/cartSlice';

function Checkout({ userId }) {
  const [formData, setFormData] = useState({
    fullname: "",
    street: "",
    city: "",
    state: "",
    zipcode: ""
  })
  const [isEditing, setIsEditing] = useState(formData.fullname === "")
  const [isPlaced, setIsPlaced] = useState(true)
  
  const carts = useSelector((state) => state.carts.entities)
  const total = carts.reduce((previous, current) => previous + current.price * current.quantity, 0)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    fetch(`/api/addresses/${userId}`)
    .then((r) => {
      if (r.ok) {
        r.json().then((address) => {
          if (address !== null) {
            setFormData(address)
            setIsEditing(formData.fullname === "")
          }          
        })
      } else {
        r.json().then((errors) => console.log(errors))
      }
    })
  }, [userId])

  function handleKeepShoppingClick() {
    history.push("/")
  }

  function handleChange(e) {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  function handleEditAddressClick() {
    setIsEditing((isEditing) => !isEditing)
  }

  function handleCheckoutSubmit(e) {
    e.preventDefault()
    postAddress()    
    carts.forEach((cart) => {
      const {id, ...cartNoId} = cart
      postOrder(cartNoId)
      deleteCart(cart.id)
      setIsPlaced((isPlaced) => !isPlaced)
    })
  }

  function postAddress() {
    fetch("/api/addresses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...formData, user_id: userId
      })
    })
  }

  function postOrder(cart) {
    fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cart)
    })
  }

  function deleteCart(cartId) {
    fetch(`/api/carts/${cartId}`, {
      method: "DELETE"
    })
    .then(() => dispatch(cartRemoved(cartId))) 
  }  

  return (
    <div>
      {isPlaced
      ?
      <div>
        {isEditing
        ?
        <form onSubmit={handleCheckoutSubmit}>
          <label htmlFor="fullname">Name:</label><br/>
          <input type="text" id="fullname" name="fullname" value={formData.fullname} onChange={handleChange}/><br/>
          <label htmlFor="street">Street:</label><br/>
          <input type="text" id="street" name="street" value={formData.street} onChange={handleChange}/><br/>
          <label htmlFor="city">City:</label><br/>
          <input type="text" id="city" name="city" value={formData.city} onChange={handleChange}/><br/>
          <label htmlFor="state">State:</label><br/>
          <input type="text" id="state" name="state" value={formData.state} onChange={handleChange}/><br/>
          <label htmlFor="zipcode">Zip code:</label><br/>
          <input type="text" id="zipcode" name="zipcode" value={formData.zipcode} onChange={handleChange}/><br/>          
          <button type="submit">Place your order</button>
        </form>
        :
        <div>
          <p>Total price: {total}</p>
          <p>Address:</p>
          <p>Name: {formData.fullname}</p>
          <p>Street: {formData.street}</p>
          <p>City: {formData.city}</p>
          <p>State: {formData.state}</p>
          <p>Zip code: {formData.zipcode}</p>
          <button onClick={handleCheckoutSubmit}>Place your order</button>      
          <button onClick={handleEditAddressClick}>Edit address</button> 
        </div>}  
      </div>
      :
      <div>
        <p>We have received your order, you will be notified when the order is dispatched, thank you for being our customer!</p>
        <button onClick={handleKeepShoppingClick}>Keep shopping?</button>
      </div>
      }    
    </div>
  );
}

export default Checkout;