const express = require("express");
const router = express.Router();

let users = [];

router.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  users.push({ id: users.length + 1, email, password });

  res.status(201).json({ message: "User registered" });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.status(200).json({ message: "Login successful" });
});

module.exports = router;
