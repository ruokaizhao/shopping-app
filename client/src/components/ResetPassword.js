import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function ResetPassword({ setUser }) {
  const [alerts, setAlerts] = useState([])
  const [errors, setErrors] = useState([])
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
          setErrors([])
          setAlerts(data.alerts)
          setTimeout(() => {
            history.push("/")
          }, 2000)
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
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sx={{mb: 2}}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Comfirm password"
                  type="password"
                  id="password2"
                  autoComplete="confirm-password"
                  value={formData.password2}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
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
        </Box>
      </Container>    
    </div>
  )
}

export default ResetPassword