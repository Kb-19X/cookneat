const mongoose = require("mongoose");
const Recipe = require("./models/Recipe");

const MONGODB_URI = "mongodb+srv://cookadmin:cookneat123@cookneat-db.anbbadf.mongodb.net/cookneat?retryWrites=true&w=majority&appName=cookneat-db";

mongoose.connect(MONGODB_URI)
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch((err) => {
    console.error("❌ Erreur de connexion :", err);
    process.exit(1);
  });

// Recettes Rapide & Facile (10)
const rapideFacileRecipes = [
  {
    title: "Omelette aux fines herbes",
    description: "Une omelette moelleuse, rapide à préparer, parfaite pour un repas simple.",
    prepTime: "5 min",
    cookTime: "5 min",
    totalTime: "10 min",
    imageUrl: "/uploads/omelette-fines-herbes.jpg",
    ingredients: [
      { description: "3 œufs" },
      { description: "2 cuillères à soupe de persil frais" },
      { description: "1 cuillère à soupe de ciboulette" },
      { description: "10 g de beurre" },
      { description: "Sel à goût" },
      { description: "Poivre à goût" }
    ],
    steps: [
      { description: "Battre les œufs avec le sel, le poivre, le persil et la ciboulette ciselés." },
      { description: "Faire fondre le beurre dans une poêle à feu moyen." },
      { description: "Verser le mélange œufs et cuire doucement en remuant." },
      { description: "Laisser prendre sans trop cuire pour garder moelleux." },
      { description: "Plier l’omelette et servir chaud." }
    ],
    isChefRecipe: true,
    category: "Rapide & facile"
  },
  {
    title: "Salade de tomates mozzarella",
    description: "Une salade fraîche et légère, idéale pour un repas express.",
    prepTime: "10 min",
    cookTime: "0 min",
    totalTime: "10 min",
    imageUrl: "/uploads/tomatemozza.jpg",
    ingredients: [
      { description: "3 tomates moyennes" },
      { description: "125 g de mozzarella" },
      { description: "Quelques feuilles de basilic frais" },
      { description: "2 cuillères à soupe d'huile d’olive" },
      { description: "Sel à goût" },
      { description: "Poivre à goût" }
    ],
    steps: [
      { description: "Couper les tomates et la mozzarella en tranches." },
      { description: "Disposer les tranches en alternance sur une assiette." },
      { description: "Ajouter les feuilles de basilic." },
      { description: "Assaisonner avec huile d’olive, sel et poivre." },
      { description: "Servir frais." }
    ],
    isChefRecipe: true,
    category: "Rapide & facile"
  },
  {
    title: "Pâtes à l’ail et huile d’olive",
    description: "Plat simple et rapide avec seulement quelques ingrédients, idéal pour les soirs pressés.",
    prepTime: "5 min",
    cookTime: "10 min",
    totalTime: "15 min",
    imageUrl: "/uploads/pates-ail-huile.jpg",
    ingredients: [
      { description: "200 g de spaghetti" },
      { description: "3 gousses d'ail" },
      { description: "4 cuillères à soupe d'huile d’olive" },
      { description: "1/2 piment rouge (optionnel)" },
      { description: "1 cuillère à soupe de persil frais" },
      { description: "Sel à goût" }
    ],
    steps: [
      { description: "Cuire les pâtes dans une grande casserole d’eau salée." },
      { description: "Faire revenir l’ail finement haché dans l’huile d’olive à feu doux." },
      { description: "Ajouter le piment (facultatif) et retirer du feu." },
      { description: "Égoutter les pâtes et mélanger avec l’huile à l’ail." },
      { description: "Parsemer de persil frais avant de servir." }
    ],
    isChefRecipe: true,
    category: "Rapide & facile"
  },
  {
    title: "Wrap au poulet et légumes croquants",
    description: "Un wrap facile et rapide à préparer, idéal pour un déjeuner sur le pouce.",
    prepTime: "10 min",
    cookTime: "5 min",
    totalTime: "15 min",
    imageUrl: "/uploads/wrap-poulet-legumes.jpg",
    ingredients: [
      { description: "2 tortillas de blé" },
      { description: "150 g de blanc de poulet cuit" },
      { description: "1 carotte râpée" },
      { description: "1/2 concombre" },
      { description: "2 cuillères à soupe de fromage frais" },
      { description: "Quelques feuilles de salade verte" },
      { description: "Sel et poivre à goût" }
    ],
    steps: [
      { description: "Tartiner les tortillas de fromage frais." },
      { description: "Ajouter les morceaux de poulet, carotte râpée, concombre en bâtonnets et salade." },
      { description: "Saler, poivrer." },
      { description: "Rouler les tortillas en serrant bien." },
      { description: "Couper en deux et servir." }
    ],
    isChefRecipe: true,
    category: "Rapide & facile"
  },
  {
    title: "Soupe de légumes express",
    description: "Une soupe chaude rapide et simple, parfaite pour une soirée légère.",
    prepTime: "10 min",
    cookTime: "15 min",
    totalTime: "25 min",
    imageUrl: "/uploads/soupe-legumes-express.jpg",
    ingredients: [
      { description: "3 carottes" },
      { description: "2 pommes de terre moyennes" },
      { description: "1 poireau" },
      { description: "1 litre de bouillon de légumes" },
      { description: "Sel et poivre à goût" }
    ],
    steps: [
      { description: "Couper tous les légumes en morceaux." },
      { description: "Faire bouillir le bouillon dans une casserole." },
      { description: "Ajouter les légumes et cuire 15 minutes." },
      { description: "Mixer la soupe jusqu’à obtention d’une texture lisse." },
      { description: "Assaisonner selon le goût et servir chaud." }
    ],
    isChefRecipe: true,
    category: "Rapide & facile"
  },
  {
    title: "Tartine avocat et œuf poché",
    description: "Une tartine gourmande et saine, prête en quelques minutes.",
    prepTime: "5 min",
    cookTime: "5 min",
    totalTime: "10 min",
    imageUrl: "/uploads/tartine-avocat-oeuf.jpg",
    ingredients: [
      { description: "2 tranches de pain complet" },
      { description: "1/2 avocat mûr" },
      { description: "2 œufs" },
      { description: "1/2 citron" },
      { description: "Sel et poivre à goût" }
    ],
    steps: [
      { description: "Faire pocher les œufs dans de l’eau frémissante." },
      { description: "Écraser l’avocat avec le jus de citron, sel et poivre." },
      { description: "Tartiner les tranches de pain avec l’avocat." },
      { description: "Déposer les œufs pochés sur les tartines." },
      { description: "Servir immédiatement." }
    ],
    isChefRecipe: true,
    category: "Rapide & facile"
  },
  {
    title: "Croque-monsieur classique",
    description: "Un classique simple et rapide à réaliser pour un repas convivial.",
    prepTime: "5 min",
    cookTime: "10 min",
    totalTime: "15 min",
    imageUrl: "/uploads/croque-monsieur.jpg",
    ingredients: [
      { description: "4 tranches de pain de mie" },
      { description: "2 tranches de jambon blanc" },
      { description: "100 g de fromage râpé" },
      { description: "10 g de beurre" }
    ],
    steps: [
      { description: "Beurrer les tranches de pain." },
      { description: "Déposer le jambon et le fromage râpé entre deux tranches." },
      { description: "Cuire dans un appareil à croque ou à la poêle 10 min jusqu’à dorure." },
      { description: "Servir chaud." }
    ],
    isChefRecipe: true,
    category: "Rapide & facile"
  },
  {
    title: "Smoothie banane-fraise",
    description: "Un smoothie fruité et frais pour démarrer la journée en énergie.",
    prepTime: "5 min",
    cookTime: "0 min",
    totalTime: "5 min",
    imageUrl: "/uploads/smoothie-banane-fraise.jpg",
    ingredients: [
      { description: "1 banane" },
      { description: "150 g de fraises" },
      { description: "200 ml de lait" },
      { description: "1 cuillère à soupe de miel (optionnel)" }
    ],
    steps: [
      { description: "Mettre tous les ingrédients dans un blender." },
      { description: "Mixer jusqu’à consistance lisse." },
      { description: "Servir frais." }
    ],
    isChefRecipe: true,
    category: "Rapide & facile"
  },
  {
    title: "Salade de quinoa aux légumes",
    description: "Une salade saine et rapide à préparer, parfaite pour l’été.",
    prepTime: "10 min",
    cookTime: "15 min",
    totalTime: "25 min",
    imageUrl: "/uploads/salade-quinoa-legumes.jpg",
    ingredients: [
      { description: "150 g de quinoa" },
      { description: "1 poivron rouge" },
      { description: "1 concombre" },
      { description: "10 tomates cerises" },
      { description: "2 cuillères à soupe d’huile d’olive" },
      { description: "1 citron" },
      { description: "Sel et poivre à goût" }
    ],
    steps: [
      { description: "Cuire le quinoa selon les instructions." },
      { description: "Couper les légumes en dés." },
      { description: "Mélanger le quinoa cuit avec les légumes." },
      { description: "Assaisonner avec huile, citron, sel et poivre." },
      { description: "Servir frais." }
    ],
    isChefRecipe: true,
    category: "Rapide & facile"
  },
  {
    title: "Toast à l’avocat et saumon fumé",
    description: "Un toast gourmand, rapide et raffiné, parfait pour un brunch.",
    prepTime: "5 min",
    cookTime: "0 min",
    totalTime: "5 min",
    imageUrl: "/uploads/toast-avocat-saumon.jpg",
    ingredients: [
      { description: "2 tranches de pain complet" },
      { description: "1/2 avocat" },
      { description: "100 g de saumon fumé" },
      { description: "Quelques brins d’aneth" },
      { description: "1/2 citron" }
    ],
    steps: [
      { description: "Tartiner le pain grillé avec l’avocat écrasé et citronné." },
      { description: "Ajouter le saumon fumé." },
      { description: "Décorer avec de l’aneth." },
      { description: "Servir immédiatement." }
    ],
    isChefRecipe: true,
    category: "Rapide & facile"
  }
];

// Insérer les recettes
async function seed() {
  try {
    await Recipe.deleteMany(); // Supprimer toutes les recettes existantes
    console.log("✅ Recettes existantes supprimées.");

    await Recipe.insertMany(rapideFacileRecipes);
    console.log(`✅ ${rapideFacileRecipes.length} recettes 'Rapide & facile' insérées.`);

    mongoose.connection.close();
    console.log("🛑 Connexion MongoDB fermée.");
  } catch (error) {
    console.error("❌ Erreur lors du seed:", error);
  }
}

seed();
