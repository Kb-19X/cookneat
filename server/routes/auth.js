const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'cookneat123';

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token manquant.' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: 'Token invalide.' });
  }
};

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ message: 'Champs manquants.' });

    const existing = await User.findOne({ email: email.trim().toLowerCase() });
    if (existing) return res.status(400).json({ message: 'Email déjà utilisé.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username: username.trim(), email: email.trim().toLowerCase(), password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id, name: newUser.username, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'Inscription réussie',
      token,
      user: { id: newUser._id, username: newUser.username, email: newUser.email, role: newUser.role }
    });
  } catch {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Champs manquants.' });

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });

    const token = jwt.sign({ id: user._id, name: user.username, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      message: 'Connexion réussie',
      token,
      user: { id: user._id, username: user.username, email: user.email, role: user.role }
    });
  } catch {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    res.json(user);
  } catch {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports = router;
