const mongoose = require("mongoose");
const User = require("../models/User");
require("dotenv").config();

const email = "coca@gmail.com"; // ✅ L'email du compte à promouvoir

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connexion MongoDB réussie");

    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ Aucun utilisateur trouvé avec cet email.");
      return process.exit(0);
    }

    if (user.role === "admin") {
      console.log("ℹ️ Cet utilisateur est déjà administrateur.");
      return process.exit(0);
    }

    user.role = "admin";
    await user.save();

    console.log(`✅ Utilisateur "${user.username}" promu administrateur avec succès !`);
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Erreur MongoDB :", err.message);
    process.exit(1);
  });
