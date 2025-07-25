const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Recipe = require('./models/recipe.model');

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://cookadmin:cookneat123@cookneat-db.anbbadf.mongodb.net/cookneat?retryWrites=true&w=majority&appName=cookneat-db';

const recipes = [
  {
    title: "Filet de bœuf Rossini",
    description: "Un grand classique français avec foie gras et truffe.",
    ingredients: [
      "2 filets de bœuf",
      "2 tranches de foie gras",
      "Pain de mie brioché",
      "Truffe noire",
      "Beurre, sel, poivre"
    ],
    steps: [
      "Saisir les filets de bœuf au beurre.",
      "Toaster les pains et poêler le foie gras.",
      "Dresser : pain, bœuf, foie gras, truffe râpée.",
      "Servir immédiatement."
    ],
    prepTime: "20",
    cookTime: "15",
    totalTime: "35",
    difficulty: "difficile",
    category: "recettes du chef",
    tags: ["gastronomie", "français", "luxe"],
    imageUrl: "https://source.unsplash.com/800x600/?beef,rossini"
  },
  {
    title: "Saint-Jacques au beurre citronné",
    description: "Coquilles Saint-Jacques saisies avec une sauce beurre citron.",
    ingredients: [
      "12 noix de Saint-Jacques",
      "Beurre",
      "Citron jaune",
      "Ciboulette",
      "Fleur de sel"
    ],
    steps: [
      "Saisir rapidement les Saint-Jacques dans le beurre.",
      "Ajouter zeste et jus de citron.",
      "Parsemer de ciboulette avant de servir."
    ],
    prepTime: "10",
    cookTime: "5",
    totalTime: "15",
    difficulty: "moyenne",
    category: "recettes du chef",
    tags: ["coquillages", "français", "gastronomique"],
    imageUrl: "https://source.unsplash.com/800x600/?scallops"
  },
  {
    title: "Risotto aux morilles",
    description: "Risotto crémeux parfumé aux champignons morilles.",
    ingredients: [
      "300 g de riz arborio",
      "Morilles séchées",
      "Bouillon de volaille",
      "Parmesan",
      "Échalote, crème"
    ],
    steps: [
      "Réhydrater les morilles.",
      "Faire revenir l’échalote, ajouter le riz.",
      "Ajouter bouillon progressivement.",
      "Terminer avec crème, morilles et parmesan."
    ],
    prepTime: "15",
    cookTime: "25",
    totalTime: "40",
    difficulty: "moyenne",
    category: "recettes du chef",
    tags: ["italien", "raffiné", "champignons"],
    imageUrl: "https://source.unsplash.com/800x600/?risotto"
  },
  {
    title: "Tartare de thon rouge",
    description: "Tartare cru assaisonné au sésame et soja.",
    ingredients: [
      "200 g de thon rouge frais",
      "Sauce soja",
      "Graines de sésame",
      "Ciboule",
      "Huile de sésame"
    ],
    steps: [
      "Couper le thon en dés.",
      "Mélanger avec les condiments.",
      "Servir frais avec des toasts."
    ],
    prepTime: "15",
    cookTime: "0",
    totalTime: "15",
    difficulty: "moyenne",
    category: "recettes du chef",
    tags: ["japonais", "cru", "raffiné"],
    imageUrl: "https://source.unsplash.com/800x600/?tuna,tartare"
  },
  {
    title: "Soufflé au fromage",
    description: "Un soufflé aérien au comté et emmental.",
    ingredients: [
      "4 œufs",
      "50 g de farine",
      "50 g de beurre",
      "200 ml de lait",
      "100 g de fromage râpé"
    ],
    steps: [
      "Préparer une béchamel, incorporer les jaunes.",
      "Ajouter les fromages.",
      "Incorporer les blancs montés.",
      "Cuire au four à 180°C pendant 25 minutes."
    ],
    prepTime: "20",
    cookTime: "25",
    totalTime: "45",
    difficulty: "moyenne",
    category: "recettes du chef",
    tags: ["soufflé", "fromage", "français"],
    imageUrl: "https://source.unsplash.com/800x600/?souffle,cheese"
  },
  {
    title: "Canard à l'orange",
    description: "Recette française classique avec sauce à l'orange.",
    ingredients: [
      "2 magrets de canard",
      "2 oranges",
      "Sucre, vinaigre",
      "Beurre",
      "Fond de veau"
    ],
    steps: [
      "Saisir les magrets côté peau.",
      "Préparer la sauce à l’orange et fond de veau.",
      "Réunir le tout pour napper le canard."
    ],
    prepTime: "15",
    cookTime: "25",
    totalTime: "40",
    difficulty: "difficile",
    category: "recettes du chef",
    tags: ["canard", "classique", "fruité"],
    imageUrl: "https://source.unsplash.com/800x600/?duck,orange"
  },
  {
    title: "Ravioles de langoustines",
    description: "Ravioles fines farcies aux langoustines et sauce bisque.",
    ingredients: [
      "Pâtes à ravioles",
      "Langoustines décortiquées",
      "Crème",
      "Bisque de crustacés",
      "Ciboulette"
    ],
    steps: [
      "Mixer la farce, former les ravioles.",
      "Cuire à l’eau salée 3 minutes.",
      "Servir avec sauce bisque chaude."
    ],
    prepTime: "30",
    cookTime: "10",
    totalTime: "40",
    difficulty: "difficile",
    category: "recettes du chef",
    tags: ["ravioli", "mer", "raffiné"],
    imageUrl: "https://source.unsplash.com/800x600/?ravioli,langoustine"
  },
  {
    title: "Œuf parfait et crémeux de champignons",
    description: "Œuf cuit à basse température avec crème de champignons.",
    ingredients: [
      "4 œufs",
      "Champignons de Paris",
      "Crème fraîche",
      "Beurre",
      "Ciboulette"
    ],
    steps: [
      "Cuire les œufs 45 minutes à 64°C.",
      "Préparer la crème de champignons.",
      "Servir l’œuf sur lit de crème chaude."
    ],
    prepTime: "10",
    cookTime: "45",
    totalTime: "55",
    difficulty: "moyenne",
    category: "recettes du chef",
    tags: ["œuf", "basse température", "champignons"],
    imageUrl: "https://source.unsplash.com/800x600/?egg,mushroom"
  },
  {
    title: "Homard rôti au beurre d’estragon",
    description: "Homard entier rôti avec beurre parfumé.",
    ingredients: [
      "1 homard vivant",
      "Beurre",
      "Estragon frais",
      "Citron",
      "Fleur de sel"
    ],
    steps: [
      "Cuire le homard, couper en deux.",
      "Rôtir avec beurre fondu et estragon.",
      "Servir avec quartiers de citron."
    ],
    prepTime: "20",
    cookTime: "15",
    totalTime: "35",
    difficulty: "difficile",
    category: "recettes du chef",
    tags: ["homard", "gastronomie", "herbes"],
    imageUrl: "https://source.unsplash.com/800x600/?lobster"
  },
  {
    title: "Mille-feuille à la vanille",
    description: "Dessert français composé de pâte feuilletée et crème pâtissière.",
    ingredients: [
      "Pâte feuilletée",
      "Crème pâtissière vanille",
      "Sucre glace",
      "Gousse de vanille",
      "Lait"
    ],
    steps: [
      "Cuire les plaques de pâte.",
      "Préparer la crème pâtissière.",
      "Monter le mille-feuille en alternant couches.",
      "Saupoudrer de sucre glace."
    ],
    prepTime: "30",
    cookTime: "25",
    totalTime: "55",
    difficulty: "moyenne",
    category: "recettes du chef",
    tags: ["dessert", "pâtisserie", "vanille"],
    imageUrl: "https://source.unsplash.com/800x600/?millefeuille"
  }
];

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connecté à MongoDB');
    return seedData();
  })
  .catch((err) => {
    console.error('❌ Erreur MongoDB :', err);
    process.exit(1);
  });

async function seedData() {
  try {
    await Recipe.deleteMany({ category: 'recettes du chef' });
    console.log('🗑️ Anciennes recettes "recettes du chef" supprimées');

    await Recipe.insertMany(recipes);
    console.log('👨‍🍳 Nouvelles recettes "recettes du chef" insérées avec succès');

    await mongoose.connection.close(); // ✅ méthode moderne sans callback
    console.log('🔌 Connexion MongoDB fermée');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du seed :', error);
    process.exit(1);
  }
}
