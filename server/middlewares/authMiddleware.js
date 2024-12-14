// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const authMiddleware = (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1]; // Extract the token from the Authorization header
//   if (!token) {
//     return res.status(403).json({ message: 'Access denied. No token provided.' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
//     req.admin = decoded; // Store decoded admin data in request object
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid token.' });
//   }
// };

// module.exports = authMiddleware;
