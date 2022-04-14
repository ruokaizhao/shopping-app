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
      {/* <form onSubmit={handleLoginSubmit}>
        <label htmlFor="username">Please enter your username:</label><br/>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange}/><br/>
        <label htmlFor="password">Please enter your password:</label><br/>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}/><br/>
        <button type="submit">Submit</button>
      </form> */}

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
          <Box component="form" onSubmit={handleLoginSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="username"
              autoComplete="email"
              autoFocus
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item sx={{mb: 4}}>
                <Link href="/Signup" variant="body2">
                  {"Don't have an account? Sign Up"}
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