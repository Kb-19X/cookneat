const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'cookneat123';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

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

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    res.json(user);
  } catch {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ message: 'Champs manquants.' });

    const existing = await User.findOne({ email: email.trim().toLowerCase() });
    if (existing) return res.status(400).json({ message: 'Email déjà utilisé.' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id, name: newUser.username, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'Inscription réussie',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        image: newUser.image || null
      }
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
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        image: user.image || null
      }
    });
  } catch {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

router.post('/forgot-password', async (req, res) => {
  const { email, username } = req.body;
  if (!email && !username) return res.status(400).json({ message: 'Email ou pseudo requis' });

  try {
    const user = await User.findOne({
      $or: [
        email ? { email: email.trim().toLowerCase() } : null,
        username ? { username: username.trim() } : null
      ].filter(Boolean)
    });

    if (!user) return res.json({ message: 'Si un compte existe, un mail vous sera envoyé.' });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    const resetLink = `${CLIENT_URL}/reset-password?token=${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Réinitialisation mot de passe CookNeat',
      html: `<p>Bonjour ${user.username},</p><p>Cliquez ici pour réinitialiser votre mot de passe :</p><a href="${resetLink}">${resetLink}</a>`
    });

    res.json({ message: 'Un lien de réinitialisation a été envoyé par email.' });
  } catch {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) return res.status(400).json({ message: 'Token et mot de passe requis.' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });

    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });

    res.json({ message: 'Mot de passe mis à jour avec succès.' });
  } catch (err) {
    if (err.name === 'TokenExpiredError') return res.status(401).json({ message: 'Le lien a expiré.' });
    res.status(400).json({ message: 'Token invalide ou autre erreur.' });
  }
});

module.exports = router;
