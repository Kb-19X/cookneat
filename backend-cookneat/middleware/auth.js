const jwt = require('jsonwebtoken');

// Middleware de vérification du token
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      name: decoded.name // Le nom est disponible depuis le token
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide' });
  }
};

const express = require('express');
const router = express.Router();
const User = require('../../models/User');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Email ou mot de passe incorrect" });
  }

  const token = jwt.sign(
    { id: user._id, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({ token });
});

module.exports = router;



