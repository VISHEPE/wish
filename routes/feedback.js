const express = require('express');
const router = express.Router();
const db = require('../config/db');
const nodemailer = require('nodemailer');

router.get('/', (req, res) => {
    res.sendFile('feedback.html', { root: 'public' });
});

router.post('/submit', (req, res) => {
    const { name, email, comments } = req.body;

    const query = 'INSERT INTO feedback (name, email, comments) VALUES (?, ?, ?)';
    db.query(query, [name, email, comments], (err) => {
        if (err) throw err;

        // Send confirmation email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Feedback Received',
            text: `Thank you for your feedback, ${name}!`,
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) return console.log(error);
            res.render('thank-you');
        });
    });
});

module.exports = router;
