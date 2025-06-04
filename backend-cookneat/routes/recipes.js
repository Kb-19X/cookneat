const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const Recipe = require('../models/Recipe');

// Storage images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Route POST pour ajouter une recette
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, time, description } = req.body;
    if (!req.file) return res.status(400).json({ error: 'Image manquante' });

    const newRecipe = new Recipe({
      title,
      time,
      description,
      imageUrl: `/uploads/${req.file.filename}`,
      userId: req.user.id,
    });

    const saved = await newRecipe.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route GET pour afficher mes recettes
router.get('/me', auth, async (req, res) => {
  const recipes = await Recipe.find({ userId: req.user.id });
  res.json(recipes);
});

module.exports = router;
