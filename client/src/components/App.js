import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Logout from "./Logout";
import NavBar from "./NavBar";
import Signup from "./Signup";
import Products from "./Products";
import Login from "./Login";

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
  }, [])

  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/signup">
          <Signup onLogin={setUser} />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/login">
          <Login onLogin={setUser} />
        </Route>
        <Route exact path="/">
          <Products products={products} />
        </Route>        
      </Switch>      
    </div>
  )
}

export default App;