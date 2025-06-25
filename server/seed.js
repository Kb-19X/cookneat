// seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Recipe = require('./models/recipe.model'); // adapte ce chemin si besoin

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cookneatproject', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connecté à MongoDB');
  seedData();
})
.catch((err) => console.error('Erreur MongoDB :', err));

const recipes = [
  {
    title: "Omelette express",
    description: "Une omelette rapide et savoureuse prête en 10 minutes.",
    prepTime: "5 min",
    cookTime: "5 min",
    totalTime: "10 min",
    imageUrl: "https://via.placeholder.com/300x200?text=Omelette",
    category: "rapide"
  },
  {
    title: "Salade thon-avocat",
    description: "Une salade fraîche, rapide et nutritive.",
    prepTime: "7 min",
    cookTime: "0 min",
    totalTime: "7 min",
    imageUrl: "https://via.placeholder.com/300x200?text=Salade+thon-avocat",
    category: "rapide"
  },
  {
    title: "Wrap poulet crudités",
    description: "Un wrap équilibré, idéal pour les repas sur le pouce.",
    prepTime: "10 min",
    cookTime: "0 min",
    totalTime: "10 min",
    imageUrl: "https://via.placeholder.com/300x200?text=Wrap+Poulet",
    category: "rapide"
  },
  {
    title: "Tartines avocat œuf",
    description: "Un classique rapide et plein d'énergie.",
    prepTime: "5 min",
    cookTime: "5 min",
    totalTime: "10 min",
    imageUrl: "https://via.placeholder.com/300x200?text=Tartine+Avocat",
    category: "rapide"
  },
  {
    title: "Smoothie banane-fraises",
    description: "Une boisson nourrissante prête en 2 minutes.",
    prepTime: "2 min",
    cookTime: "0 min",
    totalTime: "2 min",
    imageUrl: "https://via.placeholder.com/300x200?text=Smoothie",
    category: "rapide"
  },
  {
    title: "Pâtes ail et huile",
    description: "Simple, rapide et délicieux.",
    prepTime: "5 min",
    cookTime: "10 min",
    totalTime: "15 min",
    imageUrl: "https://via.placeholder.com/300x200?text=Pâtes",
    category: "rapide"
  },
  {
    title: "Bol de riz œuf soja",
    description: "Un plat rapide aux saveurs asiatiques.",
    prepTime: "5 min",
    cookTime: "10 min",
    totalTime: "15 min",
    imageUrl: "https://via.placeholder.com/300x200?text=Riz+Œuf",
    category: "rapide"
  },
  {
    title: "Soupe carottes express",
    description: "Une soupe chaude prête en moins de 20 minutes.",
    prepTime: "10 min",
    cookTime: "10 min",
    totalTime: "20 min",
    imageUrl: "https://via.placeholder.com/300x200?text=Soupe",
    category: "rapide"
  },
  {
    title: "Toast fromage-tomate",
    description: "Grillé, fondant et rapide à préparer.",
    prepTime: "3 min",
    cookTime: "5 min",
    totalTime: "8 min",
    imageUrl: "https://via.placeholder.com/300x200?text=Toast",
    category: "rapide"
  },
  {
    title: "Yaourt granola fruits",
    description: "Petit-déjeuner rapide et équilibré.",
    prepTime: "2 min",
    cookTime: "0 min",
    totalTime: "2 min",
    imageUrl: "https://via.placeholder.com/300x200?text=Yaourt",
    category: "rapide"
  }
];

async function seedData() {
  try {
    await Recipe.deleteMany({ category: 'rapide' }); // facultatif : nettoyer avant
    await Recipe.insertMany(recipes);
    console.log('Recettes rapides insérées avec succès.');
    process.exit();
  } catch (error) {
    console.error('Erreur lors du seed :', error);
    process.exit(1);
  }
}
