const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');

router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, description, imageUrl, ingredients, steps } = req.body;

    // ✅ Accepte soit un fichier uploadé, soit une URL
    if (!req.file && !imageUrl) {
      return res.status(400).json({ error: 'Image manquante' });
    }

    const newRecipe = new Recipe({
      title,
      description,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : imageUrl,
      ingredients,
      steps,
      userId: req.user.id
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});
// GET /api/recipes – Toutes les recettes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        imageUrl: `/uploads/${req.body.imageName}` // ou imageUrl directement
      },
      { new: true }
    );
    res.json(updatedRecipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
