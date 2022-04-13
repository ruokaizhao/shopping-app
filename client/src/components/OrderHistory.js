import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';

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
  console.log(orders)

  return (
    <div>
      {orders.length !== 0
      ?
      <div>
        <Grid container spacing={8} >
          {orders.map((order) => {
            return (
              <Grid item xs={12} sm={4} >
                <div key={order.id}>
                  <p>{order.title}</p>
                  <p><strong>Price: ${order.price}</strong></p>
                  <p><strong>Quantity: {order.quantity}</strong></p>
                  <img src={order.image} alt={order.title}/>
                </div>
              </Grid>              
            )
          })}        
        </Grid>
      </div> 
        
      :
      <h3>There is nothing here</h3>}    
    </div>
  )
}

export default OrderHistory;