const { verifyToken } = require('../services/jwtService');

function extractToken(req) {
  const auth = req.headers.authorization || req.headers.Authorization;
  if (typeof auth !== 'string') return null;
  if (!auth.startsWith('Bearer ')) return null;
  return auth.slice(7);
}

function requireAuth(req, res, next) {
  try {
    const token = extractToken(req);
    if (!token) {
      return res.status(401).json({ message: 'Authentication required.' });
    }
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (err) {
    console.error('Authentication failed:', err.message || err);
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
}

function requireAdmin(req, res, next) {
  try {
    const token = extractToken(req);
    if (!token) {
      return res.status(401).json({ message: 'Authentication required.' });
    }
    const payload = verifyToken(token);
    if (payload.role !== 'admin') {
      return res.status(403).json({ message: 'Admin role required.' });
    }
    req.user = payload;
    next();
  } catch (err) {
    console.error('Admin auth failed:', err.message || err);
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
}

module.exports = { requireAuth, requireAdmin };