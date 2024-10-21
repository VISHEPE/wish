const express = require('express');
const path = require('path');
const axios = require('axios');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'facial_analysis',
  });
  
  db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
  });




app.use(bodyParser.json({ limit: '10mb' }));
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/facial', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'facial.html'));
  });


  app.post('/analyze', (req, res) => {
    const imageData = req.body.image;
    
    // For simplicity, we'll return mock analysis data here
    const result = analyzeImage(imageData);
    
    // Save result to the database
    const query = 'INSERT INTO analyses (image, result) VALUES (?, ?)';
    db.query(query, [imageData, result], (err, result) => {
      if (err) throw err;
      res.json({ result: 'Analysis complete: Skin tone - Light, Pimples detected' });
    });
  });

  // Mock function to analyze the image
function analyzeImage(imageData) {
    // Here you can add real AI logic using tools like TensorFlow.js or OpenCV
    return 'Sample result';
  }
  

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});