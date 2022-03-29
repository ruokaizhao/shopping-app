import { useState, useEffect } from "react";
import Signup from "./Signup";

function App() {
  const [user, setUser] = useState({})

  useEffect(() => {
    fetch("/me")
    .then((r) => r.json())
    .then((data) => setUser(data))
  }, [])

  return (
    <div>
      <Signup onLogin={setUser} />
      <p>{user.name}</p>
    </div>
  )
}

export default App;