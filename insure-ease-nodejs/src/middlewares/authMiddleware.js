const jwt = require('jsonwebtoken');
const User  = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('Authorization Header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('❌ Auth Middleware Error:', error);
    res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
  }
};
