const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Comment = require('../models/Comment');
const verifyToken = require('../middleware/verifyToken');

// ✅ Configuration Multer (stockage des images)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/comments'); // Dossier où stocker
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// ✅ POST /api/comments — avec image optionnelle et rating optionnel
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { recipeId, text, rating } = req.body;
    const { id: userId, name } = req.user;

    if (!recipeId || !text) {
      return res.status(400).json({ error: 'RecipeId et texte sont obligatoires.' });
    }

    const newComment = new Comment({
      recipeId: mongoose.Types.ObjectId(recipeId),
      userId: mongoose.Types.ObjectId(userId),
      name,
      text,
      rating: rating || null,
      imageUrl: req.file ? `/uploads/comments/${req.file.filename}` : null
    });

    const saved = await newComment.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Erreur POST /comments :", err.message);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
