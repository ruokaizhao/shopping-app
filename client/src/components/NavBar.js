import React from 'react';
import { NavLink } from "react-router-dom";

function NavBar({ cart }) {
  return (
    <div>
      <NavLink to="/">Home page</NavLink>
      <NavLink to="/signup">Signup</NavLink>
      <NavLink to="/logout">Logout</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/cart">Items in cart: {cart.length}</NavLink>      
    </div>
  );
}
export default NavBar;