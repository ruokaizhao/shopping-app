import { useState, useEffect } from "react";
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

function App() {
  const [user, setUser] = useState({})
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch("/api/me")
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      } else {
        r.json().then((errors) => console.log(errors))
      }
    })
  }, [])

  useEffect(() => {
    fetch("/api/products")
    .then((r) => {
      if (r.ok) {
        r.json().then((products) => setProducts(products))
      } else {
        r.json().then((errors) => console.log(errors))
      }
    })
  }, [user])

  return (
    <div>
      <NavBar user={user} setProducts={setProducts} />
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
          <ProductDetail user={user}/>
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
    </div>
  )
}

export default App;