import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const Login = ({ setToken, setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password
      });

      // Save the token in localStorage
      localStorage.setItem('token', response.data.token);

      // Set token in parent component and mark as logged in
      setToken(response.data.token);
      setLoggedIn(true);
      setError('');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" variant="contained" color="primary" fullWidth>Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;