const mongoose = require("mongoose");

const stepSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
});

const recipeSchema = new mongoose.Schema({
  title: String,
  description: String,
  prepTime: String,
  cookTime: String,
  totalTime: String,
  imageUrl: String,
  ingredients: [
    {
      name: String,
      quantity: Number,
      unit: String,
      imageUrl: String,
      note: String,
    },
  ],
  steps: [stepSchema], // Tableau d’objets stepSchema
  isChefRecipe: Boolean,
  category: {
    type: String, // ✅ enum supprimé
    required: true,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
