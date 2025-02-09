import React, { useState, useEffect } from 'react';
import Login from './login';
import ShipmentStatus from './ShipmentStatus';
import './style.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loggedIn, setLoggedIn] = useState(!!token);

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
    }
  }, [token]);

  return (
    <div>
      {loggedIn ? (
        <ShipmentStatus token={token} setLoggedIn={setLoggedIn} />
      ) : (
        <Login setToken={setToken} setLoggedIn={setLoggedIn} />
      )}
    </div>
  );
};

export default App;
