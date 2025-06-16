const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Ici on vérifie si le modèle 'User' existe déjà, sinon on le crée.
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
