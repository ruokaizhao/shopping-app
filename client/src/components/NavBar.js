import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarts } from './cartSlice';

function NavBar() {
  const carts = useSelector((state) => state.carts.entities)
  const itemsInCarts = carts.reduce((previous, current) => previous + current.quantity, 0)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCarts())
  }, [])

  return (
    <div>
      <NavLink to="/">Home page</NavLink>
      <NavLink to="/signup">Signup</NavLink>
      <NavLink to="/logout">Logout</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/carts">Items in cart: {itemsInCarts}</NavLink>      
    </div>
  );
}
export default NavBar;