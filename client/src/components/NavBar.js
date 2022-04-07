import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarts } from './cartSlice';
import SearchBar from './SearchBar';

import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import "./NavBar.css"

function NavBar({ user, setProducts }) {
  const carts = useSelector((state) => state.carts.entities)
  const itemsInCarts = carts.reduce((previous, current) => previous + current.quantity, 0)
  const dispatch = useDispatch()

  // Since setUser in the App component is async, it will return user at a later time. Thus userId will be null the first time.
  // Thus the return data from server will be null since the url containing userId will be invalid, that will cause null.reduce, 
  // which is an error. So I add an if statement to only run the code within useEffect if the userId exists.
  // After the user data comes back, setUser will re-render components, this time useId exists, but in order to let code within useEffect
  // run the second time, the dependency array need to be the data that changes, in this case, userId, instead of []
  useEffect(() => {
    if (user.id) {
      dispatch(fetchCarts(user.id))
    }    
  }, [user.id])

  return (
    <div>
      

      <div className="header">

      <NavLink to="/">      
        <img className="header__logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="Home page"/>
      </NavLink>
      

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
        <SearchBar setProducts={setProducts} />
      </div>

      <div className="header__nav">
        {user.id ? 
          <div className="header__option">
            <span className="header__optionLineOne">Hello {user.name}</span>
            <span className="header__optionLineTwo">
              <NavLink to="/logout">Logout</NavLink>
            </span>
          </div> : 
          <div className="header__option">
            <span className="header__optionLineOne">Hello {user.name}</span>
            <span className="header__optionLineTwo">
              <NavLink to="/login">Login</NavLink><br/>
              <NavLink to="/signup">Signup</NavLink>
            </span>
          </div>}
        
          
        

        
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        
        

        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
            <NavLink to="/carts">{itemsInCarts}</NavLink>
            </span>
          </div>
        
      </div>
    </div>    
    </div>
  );
}
export default NavBar;