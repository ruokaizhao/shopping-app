import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Signup from "./Signup";

function App() {
  const [user, setUser] = useState({})

  useEffect(() => {
    fetch("/api/me")
    .then((r) => r.json())
    .then((data) => setUser(data))
  }, [])

  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/signup">
          <Signup onLogin={setUser} />
        </Route>
        <Route exact path="/">
          <p>{user.name}</p>
        </Route>        
      </Switch>      
    </div>
  )
}

export default App;