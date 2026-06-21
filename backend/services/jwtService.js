const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'change_this_secret';
const EXPIRES_IN = '8h';

function signToken(user) {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role || 'user'
  };
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
}

function verifyToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { signToken, verifyToken };