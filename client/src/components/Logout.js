import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { cartCleared } from '../features/cartSlice';

function Logout({ setUser }) {
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    fetch("/api/logout", {
      method: "DELETE"
    })
    .then(() => {
      setUser({})
      dispatch(cartCleared())
      history.push("/")
    })
  }, [])

  return (
    <div>      
    </div>
  );
}

export default Logout;