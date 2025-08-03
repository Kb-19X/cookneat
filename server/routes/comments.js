const express = require('express');
const mongoose = require('mongoose'); // ✅ Pour ObjectId
const router = express.Router();
const Comment = require('../models/Comment');
const verifyToken = require('../middleware/verifyToken');
const auth = require('../middleware/auth');

// 🔹 GET /api/comments — Tous les commentaires ou ceux d'une recette
router.get('/', async (req, res) => {
  try {
    const { recipeId } = req.query;
    const filter = recipeId ? { recipeId } : {};
    const comments = await Comment.find(filter)
      .sort({ createdAt: -1 })
      .populate('userId', 'name');
    res.json(comments);
  } catch (err) {
    console.error("❌ Erreur GET /comments :", err.message);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 🔹 GET /api/comments/recipe/:id — Commentaires d'une recette spécifique
router.get('/recipe/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.find({ recipeId: id })
      .sort({ createdAt: -1 })
      .populate('userId', 'name');
    res.json(comments);
  } catch (err) {
    console.error("❌ Erreur GET /comments/recipe/:id :", err.message);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 🔹 GET /api/comments/mine — Commentaires de l'utilisateur connecté
router.get('/mine', auth, async (req, res) => {
  try {
    const comments = await Comment.find({ userId: req.user.id })
      .populate('recipeId', 'title')
      .sort({ createdAt: -1 });

    const formatted = comments.map(c => ({
      text: c.text,
      rating: c.rating,
      recipeTitle: c.recipeId?.title || '[recette supprimée]',
      createdAt: c.createdAt,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("❌ Erreur dans GET /comments/mine :", err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// 🔹 POST /api/comments — Créer un commentaire lié à un user
router.post('/', verifyToken, async (req, res) => {
  try {
    const { recipeId, text, rating } = req.body;
    const { id: userId, name } = req.user;

    if (!recipeId || !text || !rating) {
      return res.status(400).json({ error: 'Champs manquants.' });
    }

    // ✅ Conversion sécurisée de recipeId en ObjectId
    const newComment = new Comment({
      recipeId: mongoose.Types.ObjectId(recipeId),
      userId: mongoose.Types.ObjectId(userId),
      name,
      text,
      rating,
    });

    const saved = await newComment.save();
    console.log("✅ Commentaire enregistré :", saved); // Log utile
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Erreur POST /comments :", err.message);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
