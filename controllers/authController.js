const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/user'); // correct path if inside controllers
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());
const saltRounds = 10;

// ================= SIGNUP ==================
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(200).send({ message: "User signup successful" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// ================= LOGIN ==================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid email or password" });
    }
    
    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, "secretkey");

    res.status(200).send({ message: "Login successful", token });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { signup, login };
