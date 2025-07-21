const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Connexion utilisateur
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Recherche de l'utilisateur par email
    const user = await User.findOne({ email });

    // Vérifie si l'utilisateur existe et si le mot de passe est correct
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    // Création du token avec l'ID, le nom et le rôle de l'utilisateur
    const token = jwt.sign(
      {
        id: user._id,
        name: user.username, // Assure-toi que "username" existe dans ton modèle
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Envoie la réponse complète au frontend
    res.json({
      token,
      username: user.username,
      role: user.role
    });

  } catch (err) {
    console.error("Erreur dans POST /login :", err.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
