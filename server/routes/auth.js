const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key_for_jwt';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// Nodemailer config (Gmail example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // ton email
    pass: process.env.EMAIL_PASS  // mot de passe ou app password
  }
});

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

    // Ajout du rôle dans le token
    const token = jwt.sign(
      { id: user._id, name: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: "Connexion réussie",
      token,
      user: {
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error("❌ Erreur dans /login :", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

// 🔑 Mot de passe oublié
router.post('/forgot-password', async (req, res) => {
  const { email, username } = req.body;

  if (!email && !username) {
    return res.status(400).json({ error: 'Email ou pseudo requis' });
  }

  try {
    // Chercher utilisateur par email ou pseudo
    const user = await User.findOne({
      ...(email ? { email: email.trim().toLowerCase() } : {}),
      ...(username ? { username: username.trim() } : {})
    });

    if (!user) {
      // Par sécurité, on renvoie un message générique
      return res.json({ message: 'Si un compte existe avec ces informations, un mail vous sera envoyé.' });
    }

    // Créer un token JWT valide 1h (ex: userId + email)
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Construire l'url de reset
    const resetLink = `${CLIENT_URL}/reset-password?token=${token}`;

    // Contenu de l'email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Réinitialisation de votre mot de passe CookNeat',
      html: `
        <p>Bonjour ${user.username},</p>
        <p>Vous avez demandé à réinitialiser votre mot de passe.</p>
        <p>Cliquez sur ce lien pour choisir un nouveau mot de passe (valide 1h) :</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Si vous n'avez pas fait cette demande, ignorez ce mail.</p>
      `
    };

    // Envoi mail
    await transporter.sendMail(mailOptions);

    res.json({ message: 'Un lien de réinitialisation a été envoyé par email.' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur, merci de réessayer plus tard.' });
  }
});

// 🔑 Réinitialisation du mot de passe (reset password)
router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ message: 'Token et nouveau mot de passe requis.' });
  }

  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    // Hasher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Mettre à jour le mot de passe dans la base
    const user = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    res.json({ message: 'Mot de passe mis à jour avec succès.' });

  } catch (err) {
    console.error('❌ Erreur dans /reset-password:', err);

    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Le lien de réinitialisation a expiré.' });
    }

    res.status(400).json({ message: 'Token invalide ou autre erreur.' });
  }
});

module.exports = router;
