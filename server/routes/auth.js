const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 🔐 Inscription
router.post('/register', async (req, res) => {
  try {
    console.log("📥 Données reçues pour l'inscription :", req.body);
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    const userExists = await User.findOne({ email: email.trim().toLowerCase() });
    if (userExists) {
      return res.status(400).json({ message: "Email déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Inscription réussie !" });

  } catch (err) {
    console.error("❌ Erreur dans /register :", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

// 🔑 Connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Champs manquants." });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: "Email ou mot de passe incorrect." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Email ou mot de passe incorrect." });
    }

    // ✅ On encode bien `id` et `username` dans le token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: "Connexion réussie",
      token,
      username: user.username
    });

  } catch (err) {
    console.error("❌ Erreur dans /login :", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

module.exports = router;
