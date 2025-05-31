const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

// GET /api/comments/ — retourne tous les commentaires
router.get("/", async (req, res) => {
  try {
    const allComments = await Comment.find();
    res.json(allComments);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// GET /api/comments/:recipeId — commentaires d'une recette spécifique
router.get("/:recipeId", async (req, res) => {
  try {
    const comments = await Comment.find({ recipeId: req.params.recipeId });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// POST /api/comments/:recipeId — ajouter un commentaire à une recette
router.post("/:recipeId", async (req, res) => {
  try {
    const { name, text, rating } = req.body;

    const newComment = new Comment({
      recipeId: req.params.recipeId,
      name,
      text,
      rating,
    });

    const saved = await newComment.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
