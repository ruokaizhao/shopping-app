import React from 'react';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function NavBar() {
  const carts = useSelector((state) => state.carts.entities)

  return (
    <div>
      <NavLink to="/">Home page</NavLink>
      <NavLink to="/signup">Signup</NavLink>
      <NavLink to="/logout">Logout</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/carts">Items in cart: {carts.length}</NavLink>      
    </div>
  );
}
export default NavBar;