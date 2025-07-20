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
      "1 poignée de menthe fraîche",
      "1 c. à soupe de jus de citron",
      "1 c. à soupe d’huile d’olive",
      "Sel et poivre"
    ],
    steps: [
      "Faites cuire le quinoa selon les instructions du paquet, puis laissez-le refroidir.",
      "Coupez le poivron, le concombre et râpez la carotte.",
      "Ciselez finement la menthe.",
      "Mélangez tous les ingrédients dans un saladier.",
      "Ajoutez le citron, l'huile, salez, poivrez, puis servez frais."
    ],
    prepTime: 10,
    cookTime: 15,
    totalTime: 25,
    difficulty: "facile",
    category: "healthy",
    tags: ["sain", "léger", "été"],
    imageUrl: "https://source.unsplash.com/800x600/?quinoa,salad"
  },
  {
    title: "Bol smoothie aux fruits rouges",
    description: "Un petit-déjeuner riche en antioxydants et en goût.",
    ingredients: [
      "1 banane",
      "100 g de fruits rouges congelés",
      "200 ml de lait d’amande",
      "1 c. à soupe de graines de chia",
      "1 poignée de noix"
    ],
    steps: [
      "Mixez la banane et les fruits rouges avec le lait d’amande jusqu’à consistance lisse.",
      "Versez dans un bol.",
      "Ajoutez les graines de chia et les noix par-dessus.",
      "Servez immédiatement bien frais."
    ],
    prepTime: 5,
    cookTime: 0,
    totalTime: 5,
    difficulty: "facile",
    category: "healthy",
    tags: ["sain", "rapide", "fruits"],
    imageUrl: "https://source.unsplash.com/800x600/?smoothie,bowl"
  },
  {
    title: "Soupe de lentilles corail et carottes",
    description: "Une soupe nourrissante et légère, parfaite pour l'hiver.",
    ingredients: [
      "100 g de lentilles corail",
      "2 carottes",
      "1 oignon",
      "1 gousse d’ail",
      "1 c. à café de cumin",
      "1 c. à soupe d’huile d’olive",
      "750 ml d’eau",
      "Sel et poivre"
    ],
    steps: [
      "Émincez l’oignon et l’ail, faites-les revenir dans une casserole avec l’huile.",
      "Ajoutez les carottes coupées en rondelles et les lentilles.",
      "Couvrez avec l’eau, portez à ébullition puis laissez mijoter 20 min.",
      "Ajoutez le cumin, mixez le tout jusqu’à obtention d’une soupe lisse.",
      "Salez, poivrez et servez chaud."
    ],
    prepTime: 10,
    cookTime: 20,
    totalTime: 30,
    difficulty: "facile",
    category: "healthy",
    tags: ["soupe", "hiver", "végétarien"],
    imageUrl: "https://source.unsplash.com/800x600/?lentil,soup"
  },
  {
    title: "Wraps de laitue au poulet",
    description: "Des wraps sans pain, frais et riches en protéines.",
    ingredients: [
      "200 g de blanc de poulet",
      "6 feuilles de laitue romaine",
      "1 carotte râpée",
      "1 avocat",
      "1 c. à soupe de sauce soja légère",
      "Sel et poivre"
    ],
    steps: [
      "Faites cuire le poulet dans une poêle puis découpez-le en lamelles.",
      "Lavez les feuilles de laitue.",
      "Écrasez l’avocat avec un peu de sel.",
      "Garnissez chaque feuille de laitue avec de l’avocat, du poulet, des carottes.",
      "Ajoutez un filet de sauce soja, roulez et servez."
    ],
    prepTime: 10,
    cookTime: 10,
    totalTime: 20,
    difficulty: "facile",
    category: "healthy",
    tags: ["protéiné", "léger", "rapide"],
    imageUrl: "https://source.unsplash.com/800x600/?lettuce,wraps"
  },
  {
    title: "Omelette aux épinards et champignons",
    description: "Une omelette saine et savoureuse pour le déjeuner.",
    ingredients: [
      "3 œufs",
      "100 g d’épinards frais",
      "100 g de champignons de Paris",
      "1 petit oignon",
      "1 c. à soupe d’huile d’olive",
      "Sel et poivre"
    ],
    steps: [
      "Émincez l’oignon et les champignons, faites-les revenir dans une poêle avec un peu d’huile.",
      "Ajoutez les épinards et laissez-les fondre.",
      "Battez les œufs avec du sel et du poivre, puis versez-les dans la poêle.",
      "Laissez cuire à feu doux jusqu’à ce que l’omelette soit bien prise.",
      "Servez chaud avec une salade."
    ],
    prepTime: 5,
    cookTime: 10,
    totalTime: 15,
    difficulty: "facile",
    category: "healthy",
    tags: ["rapide", "protéiné", "végétarien"],
    imageUrl: "https://source.unsplash.com/800x600/?omelet,spinach"
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
