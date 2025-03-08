/* require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); 

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '',
    database: 'hospital'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL Database');
    }
});

// Sample API Route
app.get('/', (req, res) => {
    res.send('Hospital Management API Running...');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
 */