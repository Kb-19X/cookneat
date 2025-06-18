const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');

// ✅ GET toutes les recettes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.json(recipes);
  } catch (error) {
    console.error('❌ Erreur dans GET /api/recipes :', error.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ✅ POST nouvelle recette (avec image ou URL)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, description, imageUrl, ingredients, steps } = req.body;

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
    console.error('❌ Erreur dans POST /api/recipes :', err.message);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ✅ PUT mettre à jour une recette
router.put("/:id", async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        imageUrl: `/uploads/${req.body.imageName}`
      },
      { new: true }
    );
    res.json(updatedRecipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE toutes les recettes sans images locales
router.delete('/deleteNonLocalImages', async (req, res) => {
  try {
    const result = await Recipe.deleteMany({
      imageUrl: { $not: { $regex: "^/uploads" } }
    });
    res.status(200).json({ deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
