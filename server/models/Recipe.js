  const mongoose = require('mongoose');

  const recipeSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    ingredients: {
      type: [String],
      default: []
    },
    steps: {
      type: [{ text: String }],
      default: []
    },

    // ✅ Auteur de la recette
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    // ✅ Utilisateurs ayant liké
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],

    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  module.exports = mongoose.model('Recipe', recipeSchema);
