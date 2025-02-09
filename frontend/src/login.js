import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';

const Login = ({ setToken, setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = "ABC Logistics - Login"; // Update browser tab title
  }, []);

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
      // Handle different types of errors
      if (!error.response) {
        setError("Unable to connect to the server. Please try again later.");
      } else if (error.response.status === 401) {
        setError("Invalid username or password.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      height: "100vh",
      backgroundColor: "#f4f4f4"
    }}>
      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        ABC LOGISTICS
      </Typography>
      <Card style={{ width: "300px", padding: "20px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth
              style={{ marginTop: "10px" }}
            >
              Login
            </Button>
          </form>
          {error && <Typography color="error" style={{ marginTop: "10px" }}>{error}</Typography>}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;