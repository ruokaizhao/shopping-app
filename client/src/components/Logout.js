import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";

function Logout({ setUser, setProducts }) {
  const history = useHistory()

  useEffect(() => {
    fetch("/api/logout", {
      method: "DELETE"
    })
    .then(() => {
      setUser({})
      setProducts([])
      history.push("/")
    })
  }, [])

  return (
    <div>      
    </div>
  );
}

export default Logout;