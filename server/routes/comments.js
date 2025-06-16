const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const verifyToken = require('../middleware/verifyToken'); // Si tu veux protéger avec auth

// 🔹 GET /api/comments — tous les commentaires ou ceux d'une recette
router.get('/', async (req, res) => {
  try {
    const { recipeId } = req.query;
    const filter = recipeId ? { recipeId } : {};
    const comments = await Comment.find(filter).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 🔹 POST /api/comments — créer un commentaire (auth requis)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { recipeId, text, rating } = req.body;
    const name = req.user.name;

    if (!recipeId || !text || !rating) {
      return res.status(400).json({ error: 'Champs manquants.' });
    }

    const newComment = new Comment({ recipeId, name, text, rating });
    const saved = await newComment.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
