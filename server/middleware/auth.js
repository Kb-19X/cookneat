
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token manquant" });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Token manquant" });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      username: decoded.name,
      role: decoded.role
    };

    next(); 

  } catch (err) {
    return res.status(401).json({ message: "Token invalide" });
  }
};
