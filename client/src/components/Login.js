import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })
  const [errors, setErrors] = useState([])
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
          setErrors([])
        })
      } else {
        r.json().then((err) => setErrors([...err.errors]))
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleLoginSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              sx={{mb: 2}}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.length !== 0 
            ?
            errors.map((error) => {
              return (
                <Typography color="red" key={error}>{error}</Typography>
              )
            })
            : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="space-between">
              <Grid item sx={{mb: 4}}>
                <Link href="/signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
              <Grid item sx={{mb: 4}}>
                <Link href="/forgot_password" variant="body2">
                  Forgot your password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>      
    </div>
  );
}

export default Login;