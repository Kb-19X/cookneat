const mongoose = require('mongoose');
const fs = require('fs');
const Recipe = require('./models/Recipe'); // adapte ce chemin si nécessaire

mongoose.connect('mongodb+srv://cookadmin:cookneat123@cookneat-db.anbbadf.mongodb.net/cookneat')
  .then(async () => {
    const data = JSON.parse(fs.readFileSync('recipes-export.json', 'utf-8'));
    await Recipe.insertMany(data);
    console.log('✅ Recettes importées dans MongoDB Atlas');
    process.exit();
  })
  .catch((err) => {
    console.error('❌ Erreur MongoDB :', err.message);
    process.exit(1);
  });
