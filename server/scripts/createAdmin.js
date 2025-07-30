// scripts/createAdmin.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config(); // charge .env pour MONGO_URI et JWT_SECRET

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  const adminEmail = 'admin@cookneat.com';
  const existingAdmin = await User.findOne({ email: adminEmail });

  if (existingAdmin) {
    console.log('❌ Un admin existe déjà avec cet email.');
    process.exit(0);
  }

  const admin = new User({
    username: 'admin',
    email: adminEmail,
    password: 'admin123', // 🔒 à changer ensuite
    role: 'admin'
  });

  await admin.save();
  console.log('✅ Admin créé avec succès :', admin.email);
  process.exit(0);
}).catch(err => {
  console.error('Erreur de connexion à MongoDB :', err.message);
  process.exit(1);
});
