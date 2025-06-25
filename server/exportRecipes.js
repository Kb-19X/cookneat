const mongoose = require('mongoose');
const fs = require('fs');
const Recipe = require('./models/Recipe');

mongoose.connect('mongodb://127.0.0.1:27017/cookneat')
  .then(async () => {
    const recipes = await Recipe.find();
    fs.writeFileSync('recipes-export.json', JSON.stringify(recipes, null, 2));
    console.log('✅ Recettes exportées dans recipes-export.json');
    process.exit();
  })
  .catch((err) => {
    console.error('❌ Erreur MongoDB :', err.message);
    process.exit(1);
  });
