const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  deleteUser,
  getUserProfile,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");
router.put('/:id/role', protect, isAdmin, updateUserRole);
// 🔐 Infos profil utilisateur connecté
router.get("/profile", protect, getUserProfile);

// 👥 Liste de tous les utilisateurs (admin)
router.get("/", protect, admin, getAllUsers);

// 🗑️ Supprimer un utilisateur (admin)
router.delete("/:id", protect, admin, deleteUser);

module.exports = router;
