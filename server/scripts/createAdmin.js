require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // adapte le chemin si besoin

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const existing = await User.findOne({ email: 'admin@cookneat.com' });

    if (existing) {
      console.log('⚠️ Un admin avec cet email existe déjà.');
      return process.exit();
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = new User({
      username: 'Admin',
      email: 'admin@cookneat.com',
      password: hashedPassword,
      role: 'admin',
    });

    await admin.save();
    console.log('✅ Admin créé avec succès !');
    process.exit();
  } catch (err) {
    console.error('❌ Erreur lors de la création de l’admin :', err);
    process.exit(1);
  }
};

createAdmin();
