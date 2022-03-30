import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";

function Logout() {
  const history = useHistory()

  useEffect(() => {
    fetch("/api/logout", {
      method: "DELETE"
    })
    .then(() => history.push("/"))
  }, [])

  return (
    <div>      
    </div>
  );
}

export default Logout;