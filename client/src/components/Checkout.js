import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { cartRemoved } from '../features/cartSlice';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, Grid, TextField } from '@mui/material';

function Checkout({ userId }) {
  const [formData, setFormData] = useState({
    id: "",
    fullname: "",
    street: "",
    city: "",
    state: "",
    zipcode: ""
  })

  const[errors, setErrors] = useState([])

  const [isEditing, setIsEditing] = useState(formData.fullname === "")
  const [isPlaced, setIsPlaced] = useState(true)  
  const carts = useSelector((state) => state.carts.entities)
  const total = carts.reduce((previous, current) => previous + current.price * current.quantity, 0)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (userId) {
      fetch(`/api/users/${userId}/addresses`)
      .then((r) => {
        if (r.ok) {
          r.json().then((address) => {
            if (address !== null) {
              setFormData(address)
              setIsEditing(false)
            }          
          })
        }
      })
    }    
  }, [userId])

  function handleChange(e) {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  function handleEditAddressClick() {
    setIsEditing((isEditing) => !isEditing)
  }

  function handleCheckoutSubmit(e) {
    e.preventDefault()
    if (formData.id === "") {
      fetch("/api/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData, user_id: userId
        })
      })
      .then((r) => {
        if (r.ok) {
          carts.forEach((cart) => {
            const {id, ...cartNoId} = cart
            postOrder(cartNoId)
            deleteCart(cart.id)            
            })
          setIsPlaced((isPlaced) => !isPlaced)
          setErrors([])
        } else {
          r.json().then((err) => setErrors([...err.errors]))
        }
      })      
    } else {
      fetch(`/api/addresses/${formData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({...formData, user_id: userId})
      })
      .then((r) => {
        if (r.ok) {
          carts.forEach((cart) => {
            const {id, ...cartNoId} = cart
            postOrder(cartNoId)
            deleteCart(cart.id)            
            })
          setIsPlaced((isPlaced) => !isPlaced)
          setErrors([])
        } else {
          r.json().then((err) => setErrors([...err.errors]))
        }
      })        
    }    
  }

  function postOrder(cart) {
    fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cart)
    })
  }

  function deleteCart(cartId) {
    fetch(`/api/carts/${cartId}`, {
      method: "DELETE"
    })
    .then(() => dispatch(cartRemoved(cartId))) 
  }  

  return (
    <div>
      {isPlaced
      ?
      <div>
        {isEditing
        ?
        <Container component="main" maxWidth="sm">        
          <Box component="form" onSubmit={handleCheckoutSubmit} sx={{ mt: 3 }}>        
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                id="fullname" fullWidth name="street" value={formData.street} onChange={handleChange} variant="outlined"label="Street" />            
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                id="fullname" fullWidth name="fullname" value={formData.fullname} onChange={handleChange} variant="outlined"label="Fullname" />
              </Grid>            
              <Grid item xs={12} sm={6}>
                <TextField
                id="fullname" fullWidth name="city" value={formData.city} onChange={handleChange} variant="outlined"label="City" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                id="fullname" fullWidth name="state" value={formData.state} onChange={handleChange} variant="outlined"label="State" />
              </Grid>
              <Grid item sx={{mb: 2}} xs={12} sm={6}>
                <TextField
                id="fullname" fullWidth name="zipcode" value={formData.zipcode} onChange={handleChange} variant="outlined"label="Zipcode" />
              </Grid>
              {errors.length !== 0 
              ?
              <Grid container direction="column">
              {errors.map((error) => {
                return (                  
                  <Typography sx={{ml: 4, mt: 3}} key={error} color="red">{error}</Typography>                                                    
                )
              })}
              </Grid>
              : null}      
              <Button fullWidth sx={{ml: 4, mt: 3, mb: 2}} type="submit" variant="contained">Place your order</Button>
            </Grid>
          </Box>
        </Container>         
        :
        <Card sx={{ minWidth: 275 }}>
          <CardContent>         
            <Typography variant="h5" gutterBottom>
              <p>Total price: {total}</p>
              <p>Name: {formData.fullname}</p>
              <p>Street: {formData.street}</p>
              <p>City: {formData.city}</p>
              <p>State: {formData.state}</p>
              <p>Zip code: {formData.zipcode}</p>
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" onClick={handleCheckoutSubmit}>Place your order</Button>
            <Button variant="contained" onClick={handleEditAddressClick}>Edit address</Button> 
          </CardActions>
        </Card>}  
      </div>
      :
      <div>
        <Typography variant="h5" sx={{mb: 3}}>We have received your order, you will be notified when the order is dispatched, thank you for being our customer!</Typography>
        <Button sx={{mb: 3}} variant="outlined" onClick={() => history.push("/")}>Keep shopping?</Button>
      </div>
      }    
    </div>
  );
}

export default Checkout;