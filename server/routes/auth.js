const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Ajouté pour la sécurité
const User = require('../models/User');

// Connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifie les champs requis
    if (!email || !password) {
      return res.status(400).json({ message: 'Champs manquants' });
    }

    // Recherche de l'utilisateur par email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    // Compare le mot de passe hashé avec bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    // Crée un token JWT
    const token = jwt.sign(
      { id: user._id, name: user.username },
      process.env.JWT_SECRET, // Doit être défini dans les variables Render
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
