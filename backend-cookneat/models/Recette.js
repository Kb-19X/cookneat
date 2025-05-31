const mongoose = require('mongoose');

const recetteSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: String,
  duree: String,
  imageUrl: String,
  categorie: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Recette', recetteSchema);
