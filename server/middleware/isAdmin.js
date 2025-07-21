const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Accès refusé (pas de token)' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Accès interdit (non admin)' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Token invalide' });
  }
};

module.exports = isAdmin;
