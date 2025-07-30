const express = require("express");
const router = express.Router();
const User = require("../models/User");  // Modèle utilisateur à ajuster

const authMiddleware = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

// Route dashboard protégée
router.get("/dashboard", authMiddleware, isAdmin, (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role,
    }
  });
});

// *** Nouvelle route : liste des utilisateurs ***
router.get("/users", authMiddleware, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclure les mdp
    res.json(users);
  } catch (error) {
    console.error("Erreur récupération utilisateurs :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
