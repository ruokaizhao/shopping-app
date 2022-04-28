import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Logout from "./Logout";
import NavBar from "./NavBar";
import Signup from "./Signup";
import Home from "./Home";
import Login from "./Login";
import Cart from "./Carts";
import ProductDetail from "./ProductDetail";
import Checkout from "./Checkout";
import OrderHistory from "./OrderHistory";
import { createTheme, Grid, Paper, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { blue } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: blue,
    // mode: "dark"
    }
});

function App() {
  const [user, setUser] = useState({})
  const [products, setProducts] = useState([])
  const productDetails = useSelector((state) => state.productDetails.entities)
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("/api/me")
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      }
    })
  }, [])

  useEffect(() => {
    fetch(`/api/search/${search}`)
    .then((r) => {
      if (r.ok) {
        r.json().then((products) => setProducts(products))
      }
    })
  }, [user, productDetails, search])

  return (
    <div>
      <ThemeProvider theme={theme} >
        <Paper elevation={3}>
          <Grid container direction="column" spacing={4}>
            <Grid item >          
              <NavBar user={user} setProducts={setProducts} search={search} setSearch={setSearch} />                  
            </Grid>
            <Grid item>
              <Switch>
                <Route path="/signup">
                  <Signup onLogin={setUser} />
                </Route>
                <Route path="/logout">
                  <Logout setUser={setUser} setProducts={setProducts} />
                </Route>
                <Route path="/login">
                  <Login onLogin={setUser} />
                </Route>
                <Route path="/carts">
                  <Cart />
                </Route>
                <Route path="/products/:productId">
                  <ProductDetail user={user} products={products} />
                </Route>
                <Route path="/checkout">
                  <Checkout userId={user.id} />
                </Route>
                <Route path="/orders">
                  <OrderHistory user={user} />
                </Route>
                <Route exact path="/">
                  <Home products={products} user={user} />
                </Route>        
              </Switch> 
            </Grid>         
          </Grid>   
        </Paper>        
      </ThemeProvider>        
    </div>
  )
}

export default App;