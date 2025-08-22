const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || "<mongodb+srv://cookadmin:cookneat123@cookneat-db.anbbadf.mongodb.net/cookneat?retryWrites=true&w=majority&appName=cookneat-db>";

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch((err) => console.error("Erreur de connexion MongoDB :", err));

(async () => {
  try {
    const hashedPassword = await bcrypt.hash("123456", 10);

    const existingUser = await User.findOne({ email: "test@test.com" });
    if (existingUser) {
      console.log("L'utilisateur test existe déjà !");
      process.exit();
    }

    const newUser = await User.create({
      username: "testuser",
      email: "test@test.com",
      password: hashedPassword,
      role: "user"
    });

    console.log("Utilisateur test créé :", newUser);
    process.exit();
  } catch (err) {
    console.error("Erreur lors de la création de l'utilisateur test :", err);
    process.exit(1);
  }
})();
