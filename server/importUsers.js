require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Ajuste le chemin si nécessaire

// ⚠️ Connexion à la base distante (Render)
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("❌ MONGO_URI non défini");
  process.exit(1);
}

mongoose.connect(mongoUri)
  .then(() => console.log("✅ Connecté à la DB distante"))
  .catch(err => console.error("❌ Erreur connexion DB :", err));

// Liste des utilisateurs normaux à créer
const users = [
  { username: 'user1', email: 'user1@test.com', password: '123456' },
  { username: 'user2', email: 'user2@test.com', password: '123456' },
  // ajoute ici tous tes autres users
];

const importUsers = async () => {
  for (let u of users) {
    const existing = await User.findOne({ email: u.email.toLowerCase() });
    if (existing) {
      console.log(`✅ Déjà présent : ${u.email}`);
      continue;
    }

    const hashedPassword = await bcrypt.hash(u.password, 10);
    const newUser = new User({
      username: u.username,
      email: u.email.toLowerCase(),
      password: hashedPassword,
      role: 'user'
    });
    await newUser.save();
    console.log(`🎉 Utilisateur créé : ${u.email}`);
  }
  console.log('✅ Import terminé');
  process.exit(0);
};

importUsers();
