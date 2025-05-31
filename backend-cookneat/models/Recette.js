// models/recettes.js
const mongoose = require('mongoose');

const RecetteSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String },
  ingredients: [String],
  instructions: { type: String },
  categorie: { type: String },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Recette', RecetteSchema);
