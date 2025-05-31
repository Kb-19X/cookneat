const express = require('express');
const router = express.Router();
const Recette = require('../models/Recette');

// Ajouter une recette
router.post('/', async (req, res) => {
  try {
    const recette = new Recette(req.body);
    const saved = await recette.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la création' });
  }
});

// Lister toutes les recettes
router.get('/', async (req, res) => {
  try {
    const recettes = await Recette.find().sort({ createdAt: -1 });
    res.json(recettes);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors du chargement' });
  }
});

module.exports = router;
