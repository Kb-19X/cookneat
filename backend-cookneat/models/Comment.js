const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  recipeId: { type: String, required: true },
  name: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);
