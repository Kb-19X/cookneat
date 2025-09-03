const express = require("express");
const router = express.Router();
const User = require("../models/User"); 

const authMiddleware = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");


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


router.get("/users", authMiddleware, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password"); 
    res.json(users);
  } catch (error) {
    console.error("Erreur récupération utilisateurs :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});


router.delete("/users/:id", authMiddleware, isAdmin, async (req, res) => {
  const userId = req.params.id;

  try {

    if (req.user.id === userId) {
      return res.status(400).json({ message: "Vous ne pouvez pas vous supprimer vous-même." });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé." });

    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "Utilisateur supprimé avec succès." });
  } catch (err) {
    console.error("Erreur suppression utilisateur :", err);
    res.status(500).json({ message: "Erreur serveur lors de la suppression." });
  }
});

module.exports = router;
