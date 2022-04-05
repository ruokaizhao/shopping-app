import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarts } from './cartSlice';

function NavBar({ userId }) {
  const carts = useSelector((state) => state.carts.entities)
  const itemsInCarts = carts.reduce((previous, current) => previous + current.quantity, 0)
  const dispatch = useDispatch()

  // Since setUser in the App component is async, it will return user at a later time. Thus userId will be null the first time.
  // Thus the return data from server will be null since the url containing userId will be invalid, that will cause null.reduce, 
  // which is an error. So I add an if statement to only run the code within useEffect if the userId exists.
  // After the user data comes back, setUser will re-render components, this time useId exists, but in order to let code within useEffect
  // run the second time, the dependency array need to be the data that changes, in this case, userId, instead of []
  useEffect(() => {
    if (userId) {
      dispatch(fetchCarts(userId))
    }    
  }, [userId])

  return (
    <div>
      <NavLink to="/">Home page</NavLink><br/>
      <NavLink to="/signup">Signup</NavLink><br/>
      <NavLink to="/logout">Logout</NavLink><br/>
      <NavLink to="/login">Login</NavLink><br/>
      <NavLink to="/carts">Items in cart: {itemsInCarts}</NavLink><br/>      
    </div>
  );
}
export default NavBar;