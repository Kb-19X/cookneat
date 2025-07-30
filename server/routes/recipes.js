const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');
require('dotenv').config();

const API_URL = process.env.API_URL;

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

// ✅ GET recettes filtrées par catégorie : healthy
router.get('/healthy', async (req, res) => {
  try {
    const recipes = await Recipe.find({ category: 'healthy' }).sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    console.error("❌ Erreur dans GET /recipes/healthy :", err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ✅ GET recettes filtrées par catégorie : proteine
router.get('/proteine', async (req, res) => {
  try {
    const recipes = await Recipe.find({ category: 'proteine' }).sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    console.error("❌ Erreur dans GET /recipes/proteine :", err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// 🔐 Voir ses propres recettes (protégé)
router.get('/mes-recettes', auth, async (req, res) => {
  try {
    const recettes = await Recipe.find({ userId: req.user.id });
    res.json(recettes);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// 🔐 Voir ses propres commentaires (protégé)
router.get('/mine', auth, async (req, res) => {
  try {
    const comments = await Comment.find({ user: req.user.id })
      .populate('recipe', 'title');
    res.json(comments.map(c => ({
      _id: c._id,
      text: c.text,
      recipeTitle: c.recipe?.title || 'Recette supprimée'
    })));
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// 🔐 Récupérer les recettes likées par l’utilisateur connecté (protégé)
router.get('/liked', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ likes: req.user.id }).sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    console.error("❌ Erreur dans /recipes/liked :", err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ✅ POST nouvelle recette (avec image ou URL) - protégé
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
      likes: []
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    console.error('❌ Erreur dans POST /api/recipes :', err.message);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ✅ PUT mettre à jour une recette - (Optionnel: tu peux aussi protéger cette route avec auth)
router.put('/:id', auth, async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.body.imageName) {
      updateData.imageUrl = `/uploads/${req.body.imageName}`;
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedRecipe) return res.status(404).json({ message: 'Recette non trouvée' });

    res.json(updatedRecipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE toutes les recettes sans images locales (protégé, car destructif)
router.delete('/deleteNonLocalImages', auth, async (req, res) => {
  try {
    const result = await Recipe.deleteMany({
      imageUrl: { $not: { $regex: "^/uploads" } }
    });
    res.status(200).json({ deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ❤️ Liker ou unliker une recette (protégé)
router.post('/:id/like', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recette non trouvée.' });

    const userId = req.user.id.toString();
    if (!Array.isArray(recipe.likes)) recipe.likes = [];

    const alreadyLiked = recipe.likes.map(id => id.toString()).includes(userId);

    if (alreadyLiked) {
      recipe.likes = recipe.likes.filter(id => id.toString() !== userId);
    } else {
      recipe.likes.push(userId);
    }

    await recipe.save();
    res.json({
      message: alreadyLiked ? 'Like retiré' : 'Recette likée',
      likes: recipe.likes.length
    });
  } catch (err) {
    console.error("❌ Erreur dans POST /:id/like :", err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ✅ GET une recette par ID (mettre en dernier pour éviter conflits avec autres routes statiques)
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recette non trouvée' });
    res.json(recipe);
  } catch (err) {
    console.error("❌ Erreur dans GET /api/recipes/:id :", err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

console.log("🌐 URL appelée :", `${API_URL}/api/recipes/proteine`);

module.exports = router;
