const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("📥 Données reçues :", { name, email, password });

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email déjà utilisé' });
    }

    const newUser = new User({ name, email, password });
    console.log("📦 Nouvel utilisateur créé, enregistrement en cours...");

    await newUser.save();

    console.log("✅ Utilisateur enregistré en base !");
    res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
  } catch (err) {
    console.error('❌ Erreur dans /register :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});
