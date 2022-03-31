import React from 'react';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function NavBar() {
  const carts = useSelector((state) => state.carts.entities)
  const itemsInCarts = carts.reduce((previous, current) => previous + current.quantity, 0)

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