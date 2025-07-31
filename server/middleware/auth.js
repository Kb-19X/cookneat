// 📁 middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Récupérer le token dans l'entête Authorization: Bearer <token>
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token manquant" });
  }

  // "Bearer token" → on récupère la partie token
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Token manquant" });
  }

  try {
    // Vérifier et décoder le token avec la clé secrète
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Stocker les infos utiles dans req.user pour la suite
    req.user = {
      id: decoded.id,
      username: decoded.name, // 'name' correspond à 'username' dans le token
      role: decoded.role
    };

    next(); // Passe au middleware/route suivant.e

  } catch (err) {
    return res.status(401).json({ message: "Token invalide" });
  }
};
