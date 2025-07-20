const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Recipe = require('./models/recipe.model');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://cookadmin:cookneat123@cookneat-db.anbbadf.mongodb.net/cookneat?retryWrites=true&w=majority&appName=cookneat-db';

const recipes = [
  {
    title: "Poulet grillé aux légumes",
    description: "Un plat riche en protéines parfait pour la prise de masse.",
    ingredients: [
      "2 filets de poulet",
      "1 courgette",
      "1 poivron rouge",
      "1 cuillère à soupe d'huile d'olive",
      "Épices au choix (paprika, ail, poivre)"
    ],
    steps: [
      "Couper les légumes en morceaux.",
      "Faire griller le poulet avec un peu d’huile d’olive.",
      "Ajouter les légumes dans la poêle et cuire 10 minutes.",
      "Servir chaud avec un filet de citron."
    ],
    prepTime: "10",
    cookTime: "15",
    totalTime: "25",
    difficulty: "facile",
    category: "proteine",
    tags: ["musculation", "protéiné", "rapide"],
    imageUrl: "https://source.unsplash.com/800x600/?grilled,chicken"
  },
  {
    title: "Omelette aux épinards et fromage",
    description: "Un petit déjeuner riche en protéines et facile à préparer.",
    ingredients: [
      "3 œufs",
      "1 poignée d'épinards frais",
      "30 g de fromage râpé",
      "Sel, poivre",
      "1 cuillère à café d’huile d’olive"
    ],
    steps: [
      "Battre les œufs avec sel et poivre.",
      "Faire revenir les épinards dans une poêle avec un peu d’huile.",
      "Verser les œufs battus et saupoudrer de fromage.",
      "Cuire quelques minutes jusqu’à ce que l’omelette soit prise."
    ],
    prepTime: "5",
    cookTime: "7",
    totalTime: "12",
    difficulty: "facile",
    category: "proteine",
    tags: ["petit-déjeuner", "musculation", "rapide"],
    imageUrl: "https://source.unsplash.com/800x600/?omelette,protein"
  },
  {
    title: "Bowl de riz au thon et avocat",
    description: "Un bol complet et protéiné à base de thon, avocat et riz.",
    ingredients: [
      "100 g de riz complet",
      "1 boîte de thon naturel",
      "1/2 avocat",
      "Quelques feuilles de coriandre",
      "Jus de citron"
    ],
    steps: [
      "Cuire le riz selon les instructions.",
      "Égoutter le thon et couper l’avocat en dés.",
      "Assembler le tout dans un bol.",
      "Ajouter coriandre, jus de citron, sel et poivre."
    ],
    prepTime: "10",
    cookTime: "15",
    totalTime: "25",
    difficulty: "facile",
    category: "proteine",
    tags: ["équilibré", "rapide", "riche en protéines"],
    imageUrl: "https://source.unsplash.com/800x600/?tuna,avocado"
  },
  {
    title: "Shake protéiné maison",
    description: "Un shake simple et efficace pour la récupération post-entraînement.",
    ingredients: [
      "300 ml de lait",
      "1 banane",
      "2 cuillères à soupe de beurre de cacahuète",
      "30 g de flocons d’avoine",
      "1 cuillère de whey (optionnelle)"
    ],
    steps: [
      "Mettre tous les ingrédients dans un mixeur.",
      "Mixer jusqu’à obtenir une texture lisse.",
      "Boire immédiatement après l’effort."
    ],
    prepTime: "5",
    cookTime: "0",
    totalTime: "5",
    difficulty: "facile",
    category: "proteine",
    tags: ["shake", "post-training", "rapide"],
    imageUrl: "https://source.unsplash.com/800x600/?protein,shake"
  },
  {
    title: "Lentilles corail au tofu",
    description: "Une recette végétarienne riche en protéines végétales.",
    ingredients: [
      "100 g de lentilles corail",
      "150 g de tofu ferme",
      "1 oignon",
      "1 tomate",
      "Épices (curcuma, cumin, paprika)"
    ],
    steps: [
      "Faire revenir l’oignon et les épices dans une casserole.",
      "Ajouter les lentilles et la tomate coupée en dés.",
      "Couvrir d’eau et cuire 20 minutes.",
      "Ajouter le tofu doré à la poêle avant de servir."
    ],
    prepTime: "10",
    cookTime: "20",
    totalTime: "30",
    difficulty: "moyenne",
    category: "proteine",
    tags: ["végétarien", "équilibré", "protéines végétales"],
    imageUrl: "https://source.unsplash.com/800x600/?lentils,tofu"
  }
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
    await Recipe.deleteMany({ category: 'proteine' });
    console.log('🗑️ Anciennes recettes "proteine" supprimées');

    await Recipe.insertMany(recipes);
    console.log('🍗 Nouvelles recettes "proteine" insérées avec succès');

    mongoose.connection.close(() => {
      console.log('🔌 Connexion MongoDB fermée');
      process.exit(0);
    });
  } catch (error) {
    console.error('❌ Erreur lors du seed :', error);
    process.exit(1);
  }
}
