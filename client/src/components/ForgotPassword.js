import React, { useState } from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [alerts, setAlerts] = useState([])
  const [errors, setErrors] = useState([])

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
        r.json().then((data) => {
          setErrors([])
          setAlerts(data.alerts)
        })
      } else {
        r.json().then((data) => {
          setAlerts([])
          setErrors(data.errors)
        })
      }
    })
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {alerts.map((alert, index) => {
            return (
              <Typography key={index} sx={{mt: 2}}>
                {alert}
              </Typography>
            )
          })}  
          {errors.map((error, index) => {
            return (
              <Typography color="red" key={index} sx={{mt: 2}}>
                {error}
              </Typography>
            )
          })}           
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 5 }}
          >
            Submit
          </Button>         
        </Box>
      </Container>
      
    </div>
  )
}

export default ForgotPassword