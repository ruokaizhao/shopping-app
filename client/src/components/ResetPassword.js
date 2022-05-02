import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

function ResetPassword({ setUser }) {
  const [alerts, setAlerts] = useState([])
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: ""
  })
  const params = useParams()
  const history = useHistory()

  function handleChange(e) {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    fetch("/api/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: params["token"],
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password2
      })
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setUser(data.user)
          setAlerts(data.alerts)
          setTimeout(() => {
            history.push("/")
          }, 2000)
        })
      } else {
        r.json().then((data) => setAlerts(data.errors))
      }
    })
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="reset-password-email">Please enter your email:</label>
        <input type="email" id="reset-password-email" value={formData.email} name="email" onChange={handleChange} />
        <label htmlFor="reset-password-password">Please enter your password:</label>
        <input type="password" id="reset-password-password" value={formData.password} name="password" onChange={handleChange} />
        <label htmlFor="reset-password-password2">Please confirm your password:</label>
        <input type="password" id="reset-password-password2" value={formData.password2} name="password2" onChange={handleChange} />
        <button type="submit">Submit</button>
        {alerts.map((alert, index) => {
          return (
            <p key={index}>{alert}</p>
          )
        })}
      </form>
    </div>
  )
}

export default ResetPassword