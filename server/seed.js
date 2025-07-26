const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Recipe = require('./models/recipe.model');

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://cookadmin:cookneat123@cookneat-db.anbbadf.mongodb.net/cookneat?retryWrites=true&w=majority&appName=cookneat-db';

const chefRecipes = [
  {
    title: "Beef Wellington",
    description: "Filet de bœuf tendre enrobé de duxelles de champignons et de foie gras, cuit dans une pâte feuilletée dorée.",
    imageUrl: "https://www.cookomix.com/wp-content/uploads/2018/12/beef_wellington_thermomix-800x600.jpg",
    ingredients: [
      "1 kg de filet de bœuf",
      "250g de pâte feuilletée",
      "150g de champignons",
      "100g de foie gras",
      "2 cuillères à soupe de moutarde",
      "Sel, poivre"
    ],
    steps: [
      { text: "Saisir le bœuf à feu vif." },
      { text: "Mixer les champignons et les faire revenir." },
      { text: "Étaler les ingrédients sur la pâte." },
      { text: "Rouler et dorer avec un jaune d'œuf." },
      { text: "Cuire 35 minutes à 200°C." }
    ],
    cookingTime: 90,
    category: "recettes du chef",
    isChefRecipe: true,
    userId: null
  },
  {
    title: "Coquilles Saint-Jacques gratinées",
    description: "Un classique des fêtes, les Saint-Jacques sont nappées d'une sauce crémeuse et dorées au four.",
    imageUrl: "https://www.academiedugout.fr/images/1130-auto",
    ingredients: [
      "12 noix de Saint-Jacques",
      "20 cl de crème fraîche",
      "1 échalote",
      "30g de beurre",
      "Chapelure",
      "Sel, poivre"
    ],
    steps: [
      { text: "Faire revenir l’échalote." },
      { text: "Ajouter la crème, puis les Saint-Jacques 2 min." },
      { text: "Verser dans des coquilles, saupoudrer de chapelure." },
      { text: "Gratiner 5 à 8 min à 200°C." }
    ],
    cookingTime: 30,
    category: "recettes du chef",
    isChefRecipe: true,
    userId: null
  },
  {
    title: "Magret de canard sauce miel et balsamique",
    description: "Magret croustillant nappé d’une sauce sucrée-salée au miel et au vinaigre balsamique.",
    imageUrl: "https://assets.afcdn.com/recipe/20180321/77462_w1024h1024c1cx2160cy2160cxb4320cyb4320.webp",
    ingredients: [
      "2 magrets de canard",
      "2 cuillères à soupe de miel",
      "2 cuillères à soupe de vinaigre balsamique",
      "Sel, poivre"
    ],
    steps: [
      { text: "Quadriller la peau du magret." },
      { text: "Cuire côté peau 6 min, retourner 2 min." },
      { text: "Dégraisser et ajouter miel + balsamique." },
      { text: "Laisser réduire et napper les magrets." }
    ],
    cookingTime: 25,
    category: "recettes du chef",
    isChefRecipe: true,
    userId: null
  },
  {
    title: "Risotto aux truffes",
    description: "Un risotto onctueux à la crème et au parmesan, relevé par l’arôme unique de la truffe.",
    imageUrl: "https://img.cuisineaz.com/660x660/2021/01/29/i158807-risotto-aux-truffes-noires.jpeg",
    ingredients: [
      "250g de riz arborio",
      "1L de bouillon de volaille",
      "1 échalote",
      "10 cl de vin blanc",
      "30g de parmesan",
      "1 cuillère à café d'huile de truffe",
      "Truffe fraîche (facultatif)"
    ],
    steps: [
      { text: "Faire revenir l’échalote." },
      { text: "Ajouter le riz, nacrer, déglacer au vin." },
      { text: "Incorporer le bouillon petit à petit." },
      { text: "Ajouter parmesan et huile de truffe en fin." }
    ],
    cookingTime: 40,
    category: "recettes du chef",
    isChefRecipe: true,
    userId: null
  },
  {
    title: "Soufflé au fromage du chef",
    description: "Un soufflé léger et aérien, au goût prononcé de fromage affiné.",
    imageUrl: "https://assets.afcdn.com/recipe/20191120/103367_w1024h1024c1cx2160cy2160cxb4320cyb4320.webp",
    ingredients: [
      "40g de beurre",
      "40g de farine",
      "25 cl de lait",
      "3 œufs",
      "100g de comté râpé",
      "Sel, poivre, muscade"
    ],
    steps: [
      { text: "Préparer une béchamel épaisse." },
      { text: "Ajouter les jaunes d’œufs et le fromage." },
      { text: "Monter les blancs en neige et les incorporer." },
      { text: "Cuire 20 min à 180°C sans ouvrir le four." }
    ],
    cookingTime: 30,
    category: "recettes du chef",
    isChefRecipe: true,
    userId: null
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connecté à MongoDB");

    // Supprime les anciennes recettes du chef
    await Recipe.deleteMany({ isChefRecipe: true });
    console.log("🗑️ Anciennes recettes du chef supprimées");

    // Insert les nouvelles recettes du chef
    await Recipe.insertMany(chefRecipes);
    console.log(`✅ ${chefRecipes.length} nouvelles recettes du chef ajoutées`);

    await mongoose.connection.close();
    console.log("🔌 Connexion MongoDB fermée");
  } catch (error) {
    console.error("❌ Erreur lors du seed :", error);
    process.exit(1);
  }
}

seed();
