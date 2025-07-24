const User = require("../models/User");

// 👤 Obtenir le profil de l'utilisateur connecté
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json(user);
  } catch (error) {
    console.error("Erreur profil :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// 👥 Obtenir tous les utilisateurs (admin uniquement)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error("Erreur getAllUsers :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// ❌ Supprimer un utilisateur
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur suppression utilisateur :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// 🔁 Mettre à jour le rôle d’un utilisateur
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["admin", "user"].includes(role)) {
      return res.status(400).json({ message: "Rôle invalide" });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    user.role = role;
    await user.save();

    res.json({ message: "Rôle mis à jour avec succès" });
  } catch (error) {
    console.error("Erreur updateUserRole :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  getUserProfile,
  getAllUsers,
  deleteUser,
  updateUserRole,
};
