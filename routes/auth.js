const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

let users = []; // Temporary in-memory storage for demo

// Register Route
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({ username, password: hashedPassword });
  res.send("Registration successful. <a href='/login.html'>Login</a>");
});

// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = user;
    res.send("Login successful. <a href='/'>Go to Home</a>");
  } else {
    res.send("Invalid username or password.");
  }
});

module.exports = router;
