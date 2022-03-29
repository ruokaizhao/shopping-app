import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Logout from "./Logout";
import NavBar from "./NavBar";
import Signup from "./Signup";
import Products from "./Products";

function App() {
  const [user, setUser] = useState({})
  const[products, setProducts] = useState([])

  useEffect(() => {
    fetch("/api/me")
    .then((r) => r.json())
    .then((data) => setUser(data))
  }, [])

  useEffect(() => {
    fetch("/api/products")
    .then((r) => r.json())
    .then((data) => setProducts(data))
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
        <Route exact path="/">
          <Products products={products} />
        </Route>        
      </Switch>      
    </div>
  )
}

export default App;