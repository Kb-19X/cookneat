// routes/admin.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");

router.get("/dashboard", authMiddleware, isAdmin, (req, res) => {
  // Envoie bien l'objet user
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
