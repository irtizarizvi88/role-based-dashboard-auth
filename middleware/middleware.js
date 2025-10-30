const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
const token = req.header('Authorization')?.split(' ')[1];
  
  if (!token) {
    return res.status(401).send({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, "secretkey"); 
    req.user = decoded; 
    next(); 
  } catch (err) {
    res.status(400).send({ message: "Invalid token" });
  }
}

module.exports = authMiddleware;
