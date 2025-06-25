const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
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
      userId: req.user.id,
      likes: [] // 👍 Initialisation ici si ton modèle ne l'a pas par défaut
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    console.error('❌ Erreur dans POST /api/recipes :', err.message);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 🔒 Voir ses propres recettes
router.get('/mes-recettes', auth, async (req, res) => {
  try {
    const recettes = await Recipe.find({ userId: req.user.id });
    res.json(recettes);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// 🔐 Récupérer les recettes likées par l’utilisateur connecté
router.get('/liked', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ likes: req.user.id }).sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    console.error("❌ Erreur dans /recipes/liked :", err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ❤️ Liker ou unliker une recette
router.post('/:id/like', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recette non trouvée.' });

    const userId = req.user.id;
    const alreadyLiked = recipe.likes?.includes(userId);

    if (alreadyLiked) {
      recipe.likes = recipe.likes.filter(id => id.toString() !== userId);
    } else {
      recipe.likes = [...(recipe.likes || []), userId];
    }

    await recipe.save();
    res.json({
      message: alreadyLiked ? 'Like retiré' : 'Recette likée',
      likes: recipe.likes.length
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ✅ PUT mettre à jour une recette
router.put('/:id', async (req, res) => {
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
