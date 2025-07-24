const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  deleteUser,
  getUserProfile,
  updateUserRole
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

// ✅ Modifier rôle utilisateur (admin)
router.put('/:id/role', protect, admin, updateUserRole);

// ✅ Infos du profil utilisateur connecté
router.get("/profile", protect, getUserProfile);

// ✅ Liste de tous les utilisateurs
router.get("/", protect, admin, getAllUsers);

// ✅ Supprimer un utilisateur
router.delete("/:id", protect, admin, deleteUser);

module.exports = router;
