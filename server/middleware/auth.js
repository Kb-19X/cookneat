const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Connexion utilisateur
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    // ✅ Ajout du rôle dans le token pour sécuriser le dashboard admin
    const token = jwt.sign(
      {
        id: user._id,
        name: user.username,
        role: user.role // 👈 ajouté ici
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (err) {
    console.error("Erreur dans POST /login :", err.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
