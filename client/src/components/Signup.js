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
    fetch("/signup", {
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
        <lable for="username">Please enter your username:</lable><br/>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} /><br/>
        <lable for="password">Please enter your password:</lable><br/>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} /><br/>
        <label for="password2">Please confirm your password:</label><br/>
        <input type="password" id="password2" name="password2" value={formData.password2} onChange={handleChange} /><br/>
        <lable for="name">Please enter your name:</lable><br/>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} /><br/>
        <label for="email">please enter your email:</label><br/>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} /><br/>
        <button type="submit">Submit</button>
      </form>      
    </div>
  );
}

export default Signup;