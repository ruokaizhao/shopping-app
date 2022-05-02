import React, { useState } from 'react'

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [alerts, setAlerts] = useState([])

  function handleSubmit(e) {
    e.preventDefault()
    fetch("/api/forgot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email: email})
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((data) => setAlerts(data.alerts))
      } else {
        r.json().then((data) => setAlerts(data.errors))
      }
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="forgot-password-email">Please enter your email:</label>
        <input type="email" id="forgot-password-email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {alerts.map((alert, index) => {
        return (
          <p key={index}>{alert}</p>
        )
      })}
    </div>
  )
}

export default ForgotPassword