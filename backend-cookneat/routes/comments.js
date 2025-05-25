const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// 👉 GET : récupérer tous les commentaires
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 👉 POST : ajouter un commentaire
router.post('/', async (req, res) => {
  const { recipeId, name, text, rating } = req.body;

  if (!recipeId || !name || !text || !rating) {
    return res.status(400).json({ error: 'Champs requis manquants' });
  }

  try {
    const comment = new Comment({ recipeId, name, text, rating });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
