const User = require("../models/User");

// 🔐 Profil de l'utilisateur connecté
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Erreur chargement profil." });
  }
};

// 👥 Récupérer tous les utilisateurs (admin)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Erreur chargement utilisateurs." });
  }
};

// 🗑️ Supprimer un utilisateur (admin)
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ error: "Erreur suppression utilisateur." });
  }
};
const updateUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

    user.role = req.body.role || user.role;
    await user.save();

    res.json({ message: "Rôle mis à jour", user });
  } catch (err) {
    res.status(500).json({ error: "Erreur mise à jour rôle" });
  }
};
module.exports = { getUserProfile, getAllUsers, deleteUser };
