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

  // Auteur de la recette - rendu optionnel pour les recettes du chef
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function() { return !this.isChefRecipe; }  // obligatoire sauf si recette chef
  },

  // Champ pour recettes du chef
  isChefRecipe: {
    type: Boolean,
    default: false
  },

  // Nouvelle catégorie
  category: {
    type: String,
    trim: true,
    default: ""
  },

  // Tableau des likes (id des utilisateurs ayant liké)
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
