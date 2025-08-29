require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); 

const mongoUri = process.env.MONGO_URI || 'mongodb+srv://cookadmin:cookneat123@cookneat-db.anbbadf.mongodb.net/cookneat?retryWrites=true&w=majority&appName=cookneat-db';

async function hashPasswords() {
  try {
    await mongoose.connect(mongoUri);
    console.log('✅ Connecté à MongoDB');

    const users = await User.find();
    console.log(`🔹 ${users.length} utilisateurs trouvés`);

    for (let user of users) {
    
      if (!user.password.startsWith('$2b$')) {
        const hashed = await bcrypt.hash(user.password, 10);
        user.password = hashed;
        await user.save();
        console.log(`🔑 Mot de passe hashé pour : ${user.email}`);
      } else {
        console.log(`✅ Déjà hashé : ${user.email}`);
      }
    }

    console.log('🎉 Tous les mots de passe sont maintenant hashés correctement');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erreur :', err);
    process.exit(1);
  }
}

hashPasswords();
