// Import required modules
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an instance of Express
const app = express();

// Middlewares
app.use(cors());                  // Enable CORS for cross-origin requests
app.use(bodyParser.json());       // Parse incoming JSON requests

// Create a connection pool (recommended for MySQL)
const pool = mysql.createPool({
  host: 'localhost',              // MySQL host (use the actual host if remote)
  user: 'root',                   // MySQL username
  password: '123456',             // MySQL password
  database: 'wings_cafe_inventory', // MySQL database name
  waitForConnections: true,
  connectionLimit: 10,            // Adjust depending on your app's needs
  queueLimit: 0
});

// Test the database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL');
  connection.release(); // Release the connection back to the pool
});

// API endpoint to insert data into MySQL
app.post('/api/u', (req, res) => {
  const { username, email, age } = req.body;
  const sql = 'INSERT INTO users (username, email, age) VALUES (?, ?, ?)';
  pool.query(sql, [username, email, age], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: 'User added successfully', userId: result.insertId });
  });
});

// API endpoint to retrieve users from MySQL
app.get('/api/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  pool.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
