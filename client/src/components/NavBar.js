import React from 'react';
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <NavLink to="/signup">Signup</NavLink>
      <NavLink to="/logout">Logout</NavLink>
      <NavLink to="/login">Login</NavLink>      
    </div>
  );
}

export default NavBar;