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
  {
    title: "Bol de smoothie aux fruits rouges",
    description: "Un petit-déjeuner vitaminé et rafraîchissant.",
    ingredients: [
      "1 banane",
      "100 g de fruits rouges surgelés",
      "1 yaourt nature",
      "1 cuillère à soupe de graines de chia",
      "Quelques amandes"
    ],
    steps: [
      "Mixer la banane, les fruits rouges et le yaourt jusqu'à consistance lisse.",
      "Verser dans un bol.",
      "Ajouter les graines de chia et les amandes sur le dessus.",
      "Déguster immédiatement."
    ],
    prepTime: "5",
    cookTime: "0",
    totalTime: "5",
    difficulty: "facile",
    category: "healthy",
    tags: ["vitaminé", "rapide", "frais"],
    imageUrl: "https://source.unsplash.com/800x600/?smoothie,bowl"
  },
  {
    title: "Wok de légumes croquants au tofu",
    description: "Un plat végétarien équilibré et savoureux.",
    ingredients: [
      "200 g de tofu ferme",
      "1 poivron",
      "1 courgette",
      "1 carotte",
      "2 cuillères à soupe de sauce soja"
    ],
    steps: [
      "Couper le tofu en dés et le faire dorer dans une poêle.",
      "Ajouter les légumes émincés et faire sauter à feu vif.",
      "Verser la sauce soja et cuire encore 5 minutes.",
      "Servir chaud avec du riz ou des nouilles."
    ],
    prepTime: "10",
    cookTime: "10",
    totalTime: "20",
    difficulty: "moyenne",
    category: "healthy",
    tags: ["végétarien", "rapide", "équilibré"],
    imageUrl: "https://source.unsplash.com/800x600/?tofu,vegetables"
  },
  {
    title: "Soupe détox au brocoli",
    description: "Une soupe légère parfaite pour se remettre en forme.",
    ingredients: [
      "1 brocoli",
      "1 pomme de terre",
      "1 oignon",
      "75 cl d'eau",
      "Sel, poivre"
    ],
    steps: [
      "Faire revenir l'oignon émincé dans une casserole.",
      "Ajouter les légumes coupés et l'eau.",
      "Cuire pendant 20 minutes.",
      "Mixer la soupe.",
      "Assaisonner et servir chaud."
    ],
    prepTime: "10",
    cookTime: "20",
    totalTime: "30",
    difficulty: "facile",
    category: "healthy",
    tags: ["détox", "léger", "hiver"],
    imageUrl: "https://source.unsplash.com/800x600/?broccoli,soup"
  },
  {
    title: "Wraps de laitue au poulet",
    description: "Des wraps sains et délicieux, parfaits pour un déjeuner léger.",
    ingredients: [
      "2 blancs de poulet",
      "Feuilles de laitue",
      "1 carotte râpée",
      "Quelques feuilles de coriandre",
      "Sauce au yaourt"
    ],
    steps: [
      "Cuire et émincer le poulet.",
      "Disposer une feuille de laitue, garnir de poulet, carottes et coriandre.",
      "Ajouter un peu de sauce au yaourt.",
      "Rouler et déguster."
    ],
    prepTime: "10",
    cookTime: "10",
    totalTime: "20",
    difficulty: "facile",
    category: "healthy",
    tags: ["léger", "protéiné", "rapide"],
    imageUrl: "https://source.unsplash.com/800x600/?lettuce,wrap"
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
