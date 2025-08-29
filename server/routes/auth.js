const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); 
const nodemailer = require('nodemailer');
const User = require('../models/User');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'cookneat123';

// Middleware d'authentification
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

// ====================== ROUTE REGISTER ======================
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) 
      return res.status(400).json({ message: 'Champs manquants.' });

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
      user: { id: newUser._id, username: newUser.username, email: newUser.email, role: newUser.role }
    });
  } catch (err) {
    console.error("Erreur register :", err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// ====================== ROUTE LOGIN ======================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔹 Logs pour debug
    console.log("=== LOGIN DEBUG ===");
    console.log("Email reçu :", email);
    console.log("Password reçu :", password);

    if (!email || !password) return res.status(400).json({ message: 'Champs manquants.' });

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    console.log("Utilisateur trouvé :", user ? user.email : null);

    if (!user) return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Mot de passe correct :", isMatch);

    if (!isMatch) return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });

    const token = jwt.sign(
      { id: user._id, name: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log("Login réussi pour :", user.email);

    res.status(200).json({
      message: 'Connexion réussie',
      token,
      user: { id: user._id, username: user.username, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error("Erreur login :", err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// ====================== ROUTE PROFILE ======================
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    res.json(user);
  } catch (err) {
    console.error("Erreur profile :", err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// ====================== ROUTE FORGOT PASSWORD ======================
router.post('/forgot-password', async (req, res) => {
  const { email, username } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (!user) {
      return res.status(404).json({ message: "Aucun utilisateur trouvé avec ces informations." });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpire = Date.now() + 3600000; // 1h
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = resetTokenExpire;
    await user.save();

    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS  
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Réinitialisation de votre mot de passe",
      html: `
        <p>Bonjour ${user.username},</p>
        <p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
        <a href="${resetURL}">${resetURL}</a>
        <p>Ce lien est valable pendant 1 heure.</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Un lien de réinitialisation vous a été envoyé par email." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
});

// ====================== ROUTE RESET PASSWORD ======================
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() } // token non expiré
    });

    if (!user) return res.status(400).json({ message: 'Token invalide ou expiré.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: 'Mot de passe réinitialisé avec succès.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports = router;
