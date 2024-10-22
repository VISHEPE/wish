const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

 // Initialize the app here
const feedbackRoutes = require('./routes/feedback'); // Adjust the path as necessary
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Database connection

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Example of using feedbackRoutes (make sure you define this properly)
app.use('/feedback', feedbackRoutes); // Ensure feedbackRoutes is defined before this line

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
