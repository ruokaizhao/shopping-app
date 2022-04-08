import React, { useEffect, useState } from 'react';

function OrderHistory({ user }) {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetch(`/api/orders/${user.id}`)
    .then((r) => {
      if (r.ok) {
        r.json().then((orders) => setOrders(orders))
      }
    })
  }, [user])

  return (
    <div>
      {orders !== []
      ?
      <div>
        {orders.map((order) => {
          return (
            <div key={order.id}>
              <p>{order.title}</p>
              <p>{order.price}</p>
              <p>{order.quantity}</p>
              <img src={order.image} alt={order.title}/>
            </div>
          )
        })}
      </div>   
      :
      <p>There is nothing here</p>}    
    </div>
  )
}

export default OrderHistory;