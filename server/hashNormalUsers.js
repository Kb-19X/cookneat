// hashNormalUsers.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const MONGO_URI = process.env.MONGO_URI;

async function resetUserPasswords() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connecté à MongoDB');

    const users = await User.find();
    console.log(`🔹 ${users.length} utilisateurs trouvés`);

    const PASSWORD_TEMP = "Password123!"; // Mot de passe temporaire

    for (const user of users) {
      if (user.email === 'coca@gmail.com') {
        console.log(`✅ Admin conservé : ${user.email}`);
        continue;
      }

      user.password = await bcrypt.hash(PASSWORD_TEMP, 10);
      await user.save();
      console.log(`🔑 Mot de passe réinitialisé pour : ${user.email}`);
    }

    console.log('🎉 Tous les mots de passe des utilisateurs normaux sont réinitialisés !');
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    mongoose.disconnect();
  }
}

resetUserPasswords();
