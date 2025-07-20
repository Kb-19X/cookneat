const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Recipe = require('./models/recipe.model');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI ||
  'mongodb+srv://cookadmin:cookneat123@cookneat-db.anbbadf.mongodb.net/cookneat?retryWrites=true&w=majority&appName=cookneat-db';

const recipes = [
  {
    title: "Salade de quinoa aux légumes croquants",
    description: "Une salade saine et colorée à base de quinoa, idéale pour l'été.",
    ingredients: ["quinoa", "poivron rouge", "concombre", "carotte râpée", "menthe fraîche"],
    steps: [
      "Faites cuire le quinoa selon les instructions.",
      "Coupez les légumes en petits morceaux.",
      "Mélangez tous les ingrédients avec la menthe hachée.",
      "Assaisonnez à votre goût avec citron et huile d’olive.",
      "Servez frais."
    ],
    prepTime: "10 min",
    cookTime: "15 min",
    totalTime: "25 min",
    difficulty: "facile",
    category: "healthy",
    tags: ["sain", "léger", "été"],
    imageUrl: "https://source.unsplash.com/800x600/?quinoa,salad"
  },
  {
    title: "Bol smoothie aux fruits rouges",
    description: "Un petit-déjeuner riche en antioxydants et en goût.",
    ingredients: ["banane", "fruits rouges congelés", "lait d’amande", "graines de chia", "noix"],
    steps: [
      "Mixez la banane et les fruits rouges avec le lait d’amande.",
      "Versez dans un bol.",
      "Ajoutez les graines de chia et les noix en topping.",
      "Servez frais."
    ],
    prepTime: "5 min",
    cookTime: "0 min",
    totalTime: "5 min",
    difficulty: "facile",
    category: "healthy",
    tags: ["sain", "rapide", "fruits"],
    imageUrl: "https://source.unsplash.com/800x600/?smoothie,bowl"
  },
  {
    title: "Soupe de lentilles corail et carottes",
    description: "Une soupe nourrissante et légère, parfaite pour l'hiver.",
    ingredients: ["lentilles corail", "carottes", "oignon", "ail", "cumin"],
    steps: [
      "Faites revenir l’oignon et l’ail dans un peu d’huile.",
      "Ajoutez les carottes coupées et les lentilles.",
      "Couvrez d’eau et laissez mijoter 20 minutes.",
      "Mixez et assaisonnez avec du cumin.",
      "Servez chaud."
    ],
    prepTime: "10 min",
    cookTime: "20 min",
    totalTime: "30 min",
    difficulty: "facile",
    category: "healthy",
    tags: ["soupe", "hiver", "végétarien"],
    imageUrl: "https://source.unsplash.com/800x600/?lentil,soup"
  },
  {
    title: "Wraps de laitue au poulet",
    description: "Des wraps sans pain, frais et riches en protéines.",
    ingredients: ["blanc de poulet", "laitue romaine", "carottes râpées", "avocat", "sauce soja légère"],
    steps: [
      "Faites cuire et émincez le poulet.",
      "Lavez les feuilles de laitue.",
      "Garnissez-les avec le poulet, carottes, avocat.",
      "Ajoutez un filet de sauce soja.",
      "Roulez et servez."
    ],
    prepTime: "10 min",
    cookTime: "10 min",
    totalTime: "20 min",
    difficulty: "facile",
    category: "healthy",
    tags: ["protéiné", "léger", "rapide"],
    imageUrl: "https://source.unsplash.com/800x600/?lettuce,wraps"
  },
  {
    title: "Omelette aux épinards et champignons",
    description: "Une omelette saine et savoureuse pour le déjeuner.",
    ingredients: ["oeufs", "épinards frais", "champignons", "oignon", "huile d’olive"],
    steps: [
      "Faites revenir les légumes dans l’huile.",
      "Battez les œufs et versez sur les légumes.",
      "Faites cuire à feu doux jusqu’à cuisson complète.",
      "Servez chaud avec une salade."
    ],
    prepTime: "5 min",
    cookTime: "10 min",
    totalTime: "15 min",
    difficulty: "facile",
    category: "healthy",
    tags: ["rapide", "protéiné", "végétarien"],
    imageUrl: "https://source.unsplash.com/800x600/?omelet,spinach"
  },
  {
    title: "Chia pudding à la mangue",
    description: "Un dessert ou petit-déjeuner tropical et rafraîchissant.",
    ingredients: ["graines de chia", "lait de coco", "mangue fraîche", "sirop d’agave"],
    steps: [
      "Mélangez les graines de chia avec le lait de coco et le sirop.",
      "Laissez reposer au frais 4h (ou toute la nuit).",
      "Ajoutez la mangue en morceaux au moment de servir."
    ],
    prepTime: "5 min",
    cookTime: "0 min",
    totalTime: "5 min (+4h repos)",
    difficulty: "facile",
    category: "healthy",
    tags: ["chia", "mangue", "sans gluten"],
    imageUrl: "https://source.unsplash.com/800x600/?chia,pudding"
  },
  {
    title: "Buddha bowl végétarien",
    description: "Un plat complet équilibré avec céréales, légumes et protéines végétales.",
    ingredients: ["quinoa", "pois chiches", "betterave râpée", "avocat", "chou rouge"],
    steps: [
      "Faites cuire le quinoa.",
      "Disposez tous les ingrédients harmonieusement dans un bol.",
      "Assaisonnez avec une vinaigrette au tahini ou citron."
    ],
    prepTime: "15 min",
    cookTime: "15 min",
    totalTime: "30 min",
    difficulty: "facile",
    category: "healthy",
    tags: ["buddha bowl", "végétarien", "complet"],
    imageUrl: "https://source.unsplash.com/800x600/?buddha,bowl"
  },
  {
    title: "Courgettes farcies végétariennes",
    description: "Des courgettes pleines de saveur et très légères.",
    ingredients: ["courgettes", "lentilles cuites", "tomates concassées", "ail", "herbes de Provence"],
    steps: [
      "Préchauffez le four à 180°C.",
      "Coupez les courgettes en deux et évidez-les.",
      "Mélangez les lentilles avec la tomate, ail et herbes.",
      "Farcissez les courgettes et enfournez 25 min."
    ],
    prepTime: "10 min",
    cookTime: "25 min",
    totalTime: "35 min",
    difficulty: "facile",
    category: "healthy",
    tags: ["végétarien", "four", "léger"],
    imageUrl: "https://source.unsplash.com/800x600/?stuffed,zucchini"
  },
  {
    title: "Taboulé au chou-fleur",
    description: "Une version low carb du taboulé traditionnel.",
    ingredients: ["chou-fleur râpé", "tomate", "concombre", "persil", "citron"],
    steps: [
      "Râpez le chou-fleur cru pour faire une semoule.",
      "Ajoutez les légumes coupés finement.",
      "Assaisonnez avec huile d’olive, citron, sel, poivre.",
      "Laissez reposer au frais 30 min."
    ],
    prepTime: "15 min",
    cookTime: "0 min",
    totalTime: "15 min",
    difficulty: "facile",
    category: "healthy",
    tags: ["sans gluten", "léger", "végétarien"],
    imageUrl: "https://source.unsplash.com/800x600/?cauliflower,tabbouleh"
  },
  {
    title: "Toasts avocat et œuf poché",
    description: "Un classique du brunch sain et complet.",
    ingredients: ["pain complet", "avocat", "œufs", "jus de citron", "piment d’Espelette"],
    steps: [
      "Faites griller le pain.",
      "Écrasez l’avocat avec un peu de citron et piment.",
      "Pochez les œufs.",
      "Tartinez le pain et ajoutez l’œuf poché sur chaque tranche."
    ],
    prepTime: "10 min",
    cookTime: "5 min",
    totalTime: "15 min",
    difficulty: "facile",
    category: "healthy",
    tags: ["brunch", "avocat", "protéiné"],
    imageUrl: "https://source.unsplash.com/800x600/?avocado,toast"
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
    await Recipe.deleteMany({ category: 'healthy' });
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
