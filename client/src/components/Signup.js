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

function Signup({ onLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password2: "",
    name: "",
    email: ""
  })

  const history = useHistory()

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
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          onLogin(user)
          history.push("/")
          setFormData({
            username: "",
            password: "",
            password2: "",
            name: "",
            email: "" 
          })
        })
      } else {
        r.json().then((errors) => console.log(errors))
      }
    })
  }

  return (
    <div>
      {/* <form onSubmit={handleFormSubmit}>
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
      </form>   */}

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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleFormSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Grid>
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Comfirm password"
                  type="password2"
                  id="password2"
                  autoComplete="confirm-password"
                  value={formData.password2}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item sx={{mb: 4}}>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>    
    </div>
  );
}

export default Signup;