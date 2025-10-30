const express = require('express');
const router = express.Router();
const auth = require('../middleware/middleware');
const role = require('../middleware/role');

const { signup, login } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
