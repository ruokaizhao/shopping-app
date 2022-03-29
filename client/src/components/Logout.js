import React, { useEffect } from 'react';

function Logout() {

  useEffect(() => {
    fetch("/api/logout", {
      method: "DELETE"
    })
  }, [])

  return (
    <div>      
    </div>
  );
}

export default Logout;