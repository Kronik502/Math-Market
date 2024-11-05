const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const newUser = new User({ email, password });
  await newUser.save();
  res.status(201).send(newUser);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password }); // Use a hashing library for passwords in production
  if (user) {
    res.send(user);
  } else {
    res.status(401).send("Invalid credentials");
  }
});

module.exports = router;
