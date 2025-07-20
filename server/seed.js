const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Recipe = require('./models/recipe.model');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://cookadmin:cookneat123@cookneat-db.anbbadf.mongodb.net/cookneat?retryWrites=true&w=majority&appName=cookneat-db';

const recipes = [
  {
    title: "Salade de quinoa aux légumes croquants",
    description: "Une salade saine et colorée à base de quinoa, idéale pour l'été.",
    ingredients: [
      "100 g de quinoa",
      "1 poivron rouge",
      "1/2 concombre",
      "1 carotte râpée",
      "Quelques feuilles de menthe fraîche"
    ],
    steps: [
      "Rincer le quinoa et le cuire selon les instructions du paquet.",
      "Couper le poivron, le concombre et la carotte en petits morceaux.",
      "Égoutter le quinoa et le laisser refroidir.",
      "Dans un saladier, mélanger le quinoa avec les légumes coupés.",
      "Ajouter la menthe ciselée, un filet de jus de citron, de l'huile d'olive, sel et poivre.",
      "Servir frais."
    ],
    prepTime: "10",
    cookTime: "15",
    totalTime: "25",
    difficulty: "facile",
    category: "healthy",
    tags: ["sain", "léger", "été"],
    imageUrl: "https://source.unsplash.com/800x600/?quinoa,salad"
  },
  // ... les autres recettes doivent suivre le même format
];



mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ Connecté à MongoDB');
    seedData();
  })
  .catch((err) => {
    console.error('❌ Erreur MongoDB :', err);
    process.exit(1);
  });

async function seedData() {
  try {
    await Recipe.deleteMany({ category: 'healthy' }); // ✅ Supprime uniquement les anciennes recettes 'healthy'
    console.log('🗑️ Anciennes recettes "Healthy" supprimées');

    await Recipe.insertMany(recipes);
    console.log('🥗 Nouvelles recettes "Healthy" insérées avec succès');

    mongoose.connection.close(() => {
      console.log('🔌 Connexion MongoDB fermée');
      process.exit(0);
    });
  } catch (error) {
    console.error('❌ Erreur lors du seed :', error);
    process.exit(1);
  }
}
