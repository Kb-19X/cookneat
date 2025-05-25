const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  recipeId: Number,
  name: String,
  text: String,
  rating: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
