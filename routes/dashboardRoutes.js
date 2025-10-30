const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/middleware');

router.get('/dashboard', authMiddleware, (req, res) => {
  if (req.user.role === 'admin') {
    res.send("Welcome to the Admin Dashboard ");
  } else {
    res.send("Welcome to the User Dashboard ");
  }
});

module.exports = router;
