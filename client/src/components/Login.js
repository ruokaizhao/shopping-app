import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })
  const history = useHistory()

  function handleChange(e) {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  function handleLoginSubmit(e) {
    e.preventDefault()
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password
      })
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          onLogin(user)
          history.push("/")
          setFormData({
            username: "",
            password: ""
          })
        })
      } else {
        r.json().then((errors) => console.log(errors))
      }
    })
  }


  return (
    <div>
      <form onSubmit={handleLoginSubmit}>
        <label htmlFor="username">Please enter your username:</label><br/>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange}/><br/>
        <label htmlFor="password">Please enter your password:</label><br/>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}/><br/>
        <button type="submit">Submit</button>
      </form>
      
    </div>
  );
}

export default Login;