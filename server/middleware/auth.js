// 📁 routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Connexion utilisateur
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérification des champs requis
    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    // Recherche utilisateur par email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    // Vérification du mot de passe
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    // Génération du token JWT
    const token = jwt.sign(
      {
        id: user._id,
        name: user.username,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Réponse avec token et infos utilisateur
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error("Erreur dans POST /login :", err.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
