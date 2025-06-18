const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route d'enregistrement
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Champs manquants' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email déjà utilisé' });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
  } catch (err) {
    console.error('Erreur register :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
