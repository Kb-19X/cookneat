const jwt = require('jsonwebtoken');
const User = require("../models/User");
const router = require("express").Router();
// Middleware pour auth
const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Token manquant" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ message: "Utilisateur non trouvé" });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalide" });
  }
};

router.post("/", authenticateUser, async (req, res) => {
  try {
    const { recipeId, text, rating } = req.body;

    const newComment = new Comment({
      recipeId,
      name: req.user.name,
      text,
      rating,
    });

    const saved = await newComment.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = authenticateUser;