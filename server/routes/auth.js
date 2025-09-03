// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'cookneat123';

// Middleware pour authentification (JWT)
const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token manquant.' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: 'Token invalide.' });
  }
};

// --- LOGIN ---
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("=== LOGIN DEBUG ===");
    console.log("Email reçu :", email);
    console.log("Password reçu :", password);

    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis.' });
    }

    // Chercher l'utilisateur en ignorant la casse
    const user = await User.findOne({ email: new RegExp(`^${email.trim()}$`, 'i') });
    console.log("Utilisateur trouvé :", user ? user.email : null);

    if (!user) return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Mot de passe correct :", isMatch);

    if (!isMatch) return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });

    // Générer token JWT
    const token = jwt.sign(
      { id: user._id, name: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log("Login réussi pour :", user.email);

    res.status(200).json({
      message: 'Connexion réussie',
      token,
      user: { id: user._id, username: user.username, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error("❌ Erreur login :", err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports = router;
