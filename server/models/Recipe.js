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

  // Ingrédients sous forme d'objets sans validation stricte (comme les étapes)
  ingredients: [
    {
      description: { type: String, required: true }
    }
  ],

  // Étapes : { description }
  steps: [
    {
      description: { type: String, required: true }
    }
  ],

  // Temps de préparation, cuisson et total
  prepTime: {
    type: String,
    trim: true
  },
  cookTime: {
    type: String,
    trim: true
  },
  totalTime: {
    type: String,
    trim: true
  },

  // Auteur de la recette - optionnel si recette du chef
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function () { return !this.isChefRecipe; } // obligatoire sauf si recette chef
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
