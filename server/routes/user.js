const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  deleteUser,
  getUserProfile,
  updateUserRole
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

router.put('/:id/role', protect, admin, updateUserRole);

router.get("/profile", protect, getUserProfile);

router.get("/", protect, admin, getAllUsers);

router.delete("/:id", protect, admin, deleteUser);

module.exports = router;
