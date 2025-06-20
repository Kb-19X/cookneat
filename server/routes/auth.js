const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifie les champs
    if (!email || !password) {
      return res.status(400).json({ message: 'Champs manquants' });
    }

    // Recherche de l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    // ⚠️ Mot de passe : ici tu dois comparer (plus tard on le hash avec bcrypt)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    // Génère un token JWT
    const token = jwt.sign(
      { id: user._id, name: user.username }, // infos utiles dans le token
      process.env.JWT_SECRET || "supersecret", // remplace par une vraie clé en prod
      { expiresIn: '2h' }
    );

    res.status(200).json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user._id,
        name: user.username,
        email: user.email
      }
    });

  } catch (err) {
    console.error('❌ Erreur dans /login :', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
