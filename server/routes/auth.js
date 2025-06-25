const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// 🔐 Route inscription
router.post('/register', async (req, res) => {
  try {
    console.log("📥 Données reçues pour l'inscription :", req.body); // DEBUG

    const { username, email, password } = req.body;

    // Vérifie que tous les champs sont présents
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    // Vérifie si l'email est déjà utilisé
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email déjà utilisé." });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création du nouvel utilisateur
    const newUser = new User({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "Inscription réussie !" });

  } catch (err) {
    console.error("❌ Erreur dans /register :", err); // Affiche toute l'erreur
    res.status(500).json({ message: "Erreur serveur." });
  }
});

module.exports = router;
