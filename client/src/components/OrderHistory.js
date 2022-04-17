import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, Rating, CardActionArea, Grid } from '@mui/material';

function OrderHistory({ user }) {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (user.id) {
      fetch(`/api/users/${user.id}/orders`)
      .then((r) => {
        if (r.ok) {
          r.json().then((orders) => setOrders(orders))
        }
      })
    }    
  }, [user.id])

  return (
    <div>
      {orders.length !== 0
      ?
      <Grid container>
        <Grid item xs={0} sm={1} />
        <Grid item container xs={12} sm={10} spacing={4}>        
          {orders.map((order) => {
            return (
              <Grid key={order.id} item xs={12} sm={4} >
                  <Card sx={{ maxWidth: 500, height: 600 }}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe">
                          <img src={order.image} alt={order.title} />
                        </Avatar>
                      }        
                      title={order.title}
                      subheader={
                        <>
                          <strong>Price: ${order.price}</strong><br/>
                          <strong>Quantity: ${order.quantity}</strong>
                        </>                          
                      }
                    />
                    <CardMedia
                      component="img"
                      height="500"
                      image={order.image}
                      alt={order.title}
                    />
                  </Card>
              </Grid>              
            )
          })} 
        </Grid>
        <Grid item xs={0} sm={1} />       
      </Grid>      
      :
      <Typography variant="h4" sx={{mb:4}}>
        There is nothing here.
      </Typography>}  
    </div>
  )
}

export default OrderHistory;