const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // adapte le chemin si besoin

const MONGO_URI = "mongodb+srv://cookadmin:cookneat123@cookneat-db.anbbadf.mongodb.net/cookneat?retryWrites=true&w=majority&appName=cookneat-db";

const recipes = [
  {
    title: "Salade de tomates mozzarella",
    description: "Une salade fraîche et légère, idéale pour un repas express.",
    prepTime: "10 min",
    cookTime: "0 min",
    totalTime: "10 min",
    imageUrl: "/uploads/tomatemozza.jpg",
    ingredients: [
      { name: "Tomates", quantity: 3, unit: "pièces", imageUrl: "/ingredients/tomate.png" },
      { name: "Mozzarella", quantity: 125, unit: "g", imageUrl: "/ingredients/mozzarella.png" },
      { name: "Basilic frais", quantity: null, unit: "quelques feuilles", imageUrl: "/ingredients/basilic.png" },
      { name: "Huile d’olive", quantity: 2, unit: "cuillères à soupe", imageUrl: "/ingredients/huile-olive.png" },
      { name: "Sel", quantity: null, unit: null, note: "à goût", imageUrl: "/ingredients/sel.png" },
      { name: "Poivre", quantity: null, unit: null, note: "à goût", imageUrl: "/ingredients/poivre.png" }
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
    title: "Omelette aux fines herbes",
    description: "Rapide, savoureuse et idéale pour un petit déjeuner ou dîner léger.",
    prepTime: "5 min",
    cookTime: "5 min",
    totalTime: "10 min",
    imageUrl: "/uploads/omelette-herbes.jpg",
    ingredients: [
      { name: "Œufs", quantity: 3, unit: "pièces", imageUrl: "/ingredients/oeuf.png" },
      { name: "Lait", quantity: 2, unit: "cuillères à soupe", imageUrl: "/ingredients/lait.png" },
      { name: "Ciboulette", quantity: 1, unit: "cuillère à soupe", imageUrl: "/ingredients/ciboulette.png" },
      { name: "Persil", quantity: 1, unit: "cuillère à soupe", imageUrl: "/ingredients/persil.png" },
      { name: "Beurre", quantity: 10, unit: "g", imageUrl: "/ingredients/beurre.png" },
      { name: "Sel et poivre", quantity: null, unit: null, note: "à goût", imageUrl: "/ingredients/selpoivre.png" }
    ],
    steps: [
      { description: "Battre les œufs avec le lait, le sel et le poivre." },
      { description: "Ajouter les herbes ciselées." },
      { description: "Faire fondre le beurre dans une poêle." },
      { description: "Verser le mélange et cuire à feu moyen." },
      { description: "Replier l’omelette et servir." }
    ],
    isChefRecipe: true,
    category: "Rapide & facile"
  },
  {
    title: "Tartines avocat œuf",
    description: "Un en-cas sain et rapide à base d’avocat et œuf poché.",
    prepTime: "10 min",
    cookTime: "5 min",
    totalTime: "15 min",
    imageUrl: "/uploads/tartine-avocat.jpg",
    ingredients: [
      { name: "Pain complet", quantity: 2, unit: "tranches", imageUrl: "/uploads/pain.jpg" },
      { name: "Avocat", quantity: 1, unit: "pièce", imageUrl: "/ingredients/avocat.jpg" },
      { name: "Œuf", quantity: 2, unit: "pièces", imageUrl: "/ingredients/oeuf.jpg" },
      { name: "Citron", quantity: 0.5, unit: "pièce", imageUrl: "/ingredients/citron.jpg" },
      { name: "Piment d'Espelette", quantity: null, unit: null, note: "optionnel", imageUrl: "/ingredients/piment.jpg" },
      { name: "Sel", quantity: null, unit: null, imageUrl: "/ingredients/sel.jpg" }
    ],
    steps: [
      { description: "Faire griller les tranches de pain." },
      { description: "Écraser l’avocat avec du jus de citron et du sel." },
      { description: "Cuire les œufs pochés dans de l’eau frémissante." },
      { description: "Tartiner le pain avec l’avocat." },
      { description: "Déposer un œuf sur chaque tartine et saupoudrer de piment." }
    ],
    isChefRecipe: true,
    category: "Rapide & facile"
  },
  {
    title: "Smoothie banane-fraise",
    description: "Un smoothie doux et fruité parfait pour bien commencer la journée.",
    prepTime: "5 min",
    cookTime: "0 min",
    totalTime: "5 min",
    imageUrl: "/uploads/smoothie-bananefraise.jpg",
    ingredients: [
      { name: "Banane", quantity: 1, unit: "pièce", imageUrl: "/ingredients/banane.png" },
      { name: "Fraises", quantity: 100, unit: "g", imageUrl: "/ingredients/fraise.png" },
      { name: "Yaourt nature", quantity: 125, unit: "g", imageUrl: "/ingredients/yaourt.png" },
      { name: "Lait", quantity: 10, unit: "cl", imageUrl: "/ingredients/lait.png" },
      { name: "Miel", quantity: 1, unit: "cuillère à café", note: "facultatif", imageUrl: "/ingredients/miel.png" }
    ],
    steps: [
      { description: "Mettre la banane, les fraises, le yaourt et le lait dans un blender." },
      { description: "Mixer jusqu’à obtenir une texture lisse." },
      { description: "Ajouter le miel selon le goût." },
      { description: "Servir frais." }
    ],
    isChefRecipe: true,
    category: "Rapide & facile"
  },
  {
    title: "Wraps au poulet",
    description: "Délicieux wraps garnis de poulet, crudités et sauce légère.",
    prepTime: "15 min",
    cookTime: "10 min",
    totalTime: "25 min",
    imageUrl: "/uploads/wraps-poulet.jpg",
    ingredients: [
      { name: "Tortillas de blé", quantity: 2, unit: "pièces", imageUrl: "/ingredients/tortilla.png" },
      { name: "Blanc de poulet", quantity: 150, unit: "g", imageUrl: "/ingredients/poulet.png" },
      { name: "Salade verte", quantity: 1, unit: "poignée", imageUrl: "/ingredients/salade.png" },
      { name: "Carotte", quantity: 1, unit: "pièce", imageUrl: "/ingredients/carotte.png" },
      { name: "Yaourt grec", quantity: 2, unit: "cuillères à soupe", imageUrl: "/ingredients/yaourt.png" },
      { name: "Jus de citron", quantity: 1, unit: "cuillère à soupe", imageUrl: "/ingredients/citron.png" }
    ],
    steps: [
      { description: "Cuire le blanc de poulet et le couper en lanières." },
      { description: "Laver et couper les légumes." },
      { description: "Mélanger le yaourt grec avec le jus de citron." },
      { description: "Réchauffer les tortillas." },
      { description: "Garnir les tortillas avec le poulet, les légumes et la sauce." }
    ],
    isChefRecipe: true,
    category: "Rapide & facile"
  },
  {
    title: "Toasts au fromage frais et radis",
    description: "Un apéritif rapide, croquant et frais.",
    prepTime: "10 min",
    cookTime: "0 min",
    totalTime: "10 min",
    imageUrl: "/uploads/toast-radis.jpg",
    ingredients: [
      { name: "Pain de campagne", quantity: 4, unit: "tranches", imageUrl: "/ingredients/pain.png" },
      { name: "Fromage frais", quantity: 100, unit: "g", imageUrl: "/ingredients/fromagefrais.png" },
      { name: "Radis", quantity: 6, unit: "pièces", imageUrl: "/ingredients/radis.png" },
      { name: "Ciboulette", quantity: 1, unit: "cuillère à soupe", imageUrl: "/ingredients/ciboulette.png" },
      { name: "Poivre", quantity: null, unit: null, imageUrl: "/ingredients/poivre.png" }
    ],
    steps: [
      { description: "Toaster les tranches de pain." }, 
      { description: "Étaler le fromage frais sur les toasts." },
      { description: "Couper les radis en fines tranches." },
      { description: "Disposer les radis sur le fromage." },
      { description: "Parsemer de ciboulette et poivre." }
    ],
    isChefRecipe: true,
    category: "Rapide & facile"
  }
];

async function seed() {
  try {
    console.log("Connexion à la base MongoDB...");
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connexion réussie.");

    // Suppression des recettes Rapide & facile existantes
    await Recipe.deleteMany({ category: "Rapide & facile" });
    console.log("Recettes 'Rapide & facile' supprimées.");

    // Insertion des nouvelles recettes
    await Recipe.insertMany(recipes);
    console.log("Recettes 'Rapide & facile' insérées avec succès !");

    await mongoose.disconnect();
    console.log("Déconnexion de MongoDB réussie.");
    process.exit(0);
  } catch (error) {
    console.error("Erreur lors du seed : ", error);
    process.exit(1);
  }
}

seed();
