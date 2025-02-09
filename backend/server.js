const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(express.json()); // For parsing JSON
app.use(cors()); // For enabling CORS

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydatabase',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Login Route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Find user by username
  db.query('SELECT * FROM customers WHERE username = ?', [username], (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password with hashed password
    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Error verifying password' });

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.id, username: user.username }, 'secret_key', {
        expiresIn: '1h',
      });

      return res.json({ message: 'Login successful', token });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token from Authorization header
    if (!token) return res.status(401).json({ message: 'Access Denied' });
  
    jwt.verify(token, 'secret_key', (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });
      req.user = user; // Attach user information to the request
      next();
    });
  };
  
  // Route to get customer's shipment status
  app.get('/shipments', authenticateToken, (req, res) => {
    const customerId = req.user.id;
  
    // Query to get shipments for the logged-in customer
    db.query('SELECT * FROM shipments WHERE customer_id = ?', [customerId], (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' });
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'No shipments found' });
      }
  
      res.json(results);
    });
  });