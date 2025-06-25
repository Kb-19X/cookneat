// models/recipe.model.js
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: String,
  description: String,
  prepTime: String,
  cookTime: String,
  totalTime: String,
  imageUrl: String,
  category: String
});

module.exports = mongoose.model('Recipe', recipeSchema);
