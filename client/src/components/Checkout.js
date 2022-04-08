import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function Checkout(props) {
  const [formData, setFormData] = useState({
    fullname: "",
    street: "",
    city: "",
    state: "",
    zipcode: ""
  })
  const carts = useSelector((state) => state.carts.entities)
  const total = carts.reduce((previous, current) => previous + current.price * current.quantity, 0)

  function handleChange(e) {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  function handleCheckoutSubmit(e) {
    e.preventDefault()

  }

  return (
    <div>
      <p>Total: {total}</p>
      <form onSubmit={handleCheckoutSubmit}>
        <input type="text" id="fullname" name="fullname" value={formData.fullname} onChange={handleChange}/><br/>
        <label htmlFor="fullname">Name:</label><br/>
        <input type="text" id="street" name="street" value={formData.street} onChange={handleChange}/><br/>
        <label htmlFor="street">Street:</label><br/>
        <input type="text" id="city" name="city" value={formData.city} onChange={handleChange}/><br/>
        <label htmlFor="city">City:</label><br/>
        <input type="text" id="state" name="state" value={formData.state} onChange={handleChange}/><br/>
        <label htmlFor="state">State:</label><br/>
        <input type="text" id="zipcode" name="zipcode" value={formData.zipcode} onChange={handleChange}/><br/>
        <label htmlFor="zipcode">Zip code:</label><br/>
        <button type="submit">Submit</button>
      </form>      
    </div>
  );
}

export default Checkout;