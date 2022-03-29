import React, { useState } from 'react';

function Signup({ onLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password2: "",
    name: "",
    email: ""
  })

  function handleChange(e) {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
        password_confirmation: formData.password2,
        name: formData.name,
        email: formData.email
      })
    })
    .then((r) => r.json())
    .then((data) => onLogin(data))
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="username">Please enter your username:</label><br/>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} /><br/>
        <label htmlFor="password">Please enter your password:</label><br/>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} /><br/>
        <label htmlFor="password2">Please confirm your password:</label><br/>
        <input type="password" id="password2" name="password2" value={formData.password2} onChange={handleChange} /><br/>
        <label htmlFor="name">Please enter your name:</label><br/>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} /><br/>
        <label htmlFor="email">please enter your email:</label><br/>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} /><br/>
        <button type="submit">Submit</button>
      </form>      
    </div>
  );
}

export default Signup;