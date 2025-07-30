// 📁 middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Récupérer le token dans l'entête Authorization: Bearer <token>
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token manquant" });
  }

  const token = authHeader.split(' ')[1]; // "Bearer token"

  if (!token) {
    return res.status(401).json({ message: "Token manquant" });
  }

  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Stocker les infos utiles dans req.user
    req.user = {
      id: decoded.id,
      username: decoded.name,  // attention ici, c’est "name" dans le token
      role: decoded.role
    };

    next();

  } catch (err) {
    return res.status(401).json({ message: "Token invalide" });
  }
};
