const express = require("express");
const router = express.Router();

// ✅ Corriger les chemins selon ta structure actuelle
const authMiddleware = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

// ✅ Route protégée par auth + rôle admin
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

module.exports = router;
