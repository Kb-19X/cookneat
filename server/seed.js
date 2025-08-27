const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // adapte le chemin si besoin

const MONGO_URI = "mongodb+srv://cookadmin:cookneat123@cookneat-db.anbbadf.mongodb.net/cookneat?retryWrites=true&w=majority&appName=cookneat-db";

const recipes = [
  {
    title: "Salade de quinoa et légumes grillés",
    description: "Une salade riche en protéines végétales et fibres, idéale pour un repas léger.",
    prepTime: "15 min",
    cookTime: "15 min",
    totalTime: "30 min",
    imageUrl: "/uploads/salade-quinoa.jpg",
    ingredients: [
      { name: "Quinoa", quantity: 150, unit: "g", imageUrl: "/uploads/quinoa.png" },
      { name: "Courgette", quantity: 1, unit: "pièce", imageUrl: "/uploads/courgette.png" },
      { name: "Poivron rouge", quantity: 1, unit: "pièce", imageUrl: "/uploads/poivron.png" },
      { name: "Tomates cerises", quantity: 150, unit: "g", imageUrl: "/uploads/tomates.png" },
      { name: "Feta", quantity: 50, unit: "g", imageUrl: "/uploads/feta.png" },
      { name: "Huile d’olive", quantity: 1, unit: "cuillère à soupe", imageUrl: "/uploads/huile-olive.png" },
      { name: "Sel et poivre", quantity: null, unit: null, imageUrl: "/uploads/selpoivre.png" }
    ],
    steps: [
      { description: "Cuire le quinoa selon les instructions." },
      { description: "Griller la courgette et le poivron coupés en lamelles." },
      { description: "Mélanger le quinoa, les légumes, la feta émiettée et assaisonner." }
    ],
    isChefRecipe: true,
    category: "Healthy"
  },
  {
    title: "Smoothie bowl aux fruits rouges",
    description: "Un bowl vitaminé à base de fruits rouges et granola pour un petit-déjeuner équilibré.",
    prepTime: "10 min",
    cookTime: "0 min",
    totalTime: "10 min",
    imageUrl: "/uploads/smoothie-bowl.jpg",
    ingredients: [
      { name: "Fruits rouges (frais ou surgelés)", quantity: 150, unit: "g", imageUrl: "/uploads/fruits-rouges.png" },
      { name: "Banane", quantity: 1, unit: "pièce", imageUrl: "/uploads/banane.png" },
      { name: "Lait d’amande", quantity: 150, unit: "ml", imageUrl: "/uploads/lait-amande.png" },
      { name: "Granola", quantity: 30, unit: "g", imageUrl: "/uploads/granola.png" },
      { name: "Graines de chia", quantity: 1, unit: "cuillère à soupe", imageUrl: "/uploads/chia.png" }
    ],
    steps: [
      { description: "Mixer les fruits rouges, la banane et le lait d’amande." },
      { description: "Verser dans un bol et ajouter granola et graines de chia en topping." }
    ],
    isChefRecipe: true,
    category: "Healthy"
  },
  {
    title: "Poulet grillé et légumes vapeur",
    description: "Une assiette légère et riche en protéines avec des légumes croquants.",
    prepTime: "10 min",
    cookTime: "20 min",
    totalTime: "30 min",
    imageUrl: "/uploads/poulet-legumes.jpg",
    ingredients: [
      { name: "Blanc de poulet", quantity: 200, unit: "g", imageUrl: "/uploads/poulet.png" },
      { name: "Brocoli", quantity: 150, unit: "g", imageUrl: "/uploads/brocoli.png" },
      { name: "Carottes", quantity: 100, unit: "g", imageUrl: "/uploads/carottes.png" },
      { name: "Huile d’olive", quantity: 1, unit: "cuillère à soupe", imageUrl: "/uploads/huile-olive.png" },
      { name: "Sel et poivre", quantity: null, unit: null, imageUrl: "/uploads/selpoivre.png" }
    ],
    steps: [
      { description: "Assaisonner le poulet et le faire griller." },
      { description: "Cuire les légumes à la vapeur 8-10 min." },
      { description: "Servir le poulet avec les légumes assaisonnés." }
    ],
    isChefRecipe: true,
    category: "Healthy"
  },
  {
    title: "Avocado toast au saumon fumé",
    description: "Une tartine healthy pleine d’oméga-3 et de bons lipides.",
    prepTime: "5 min",
    cookTime: "0 min",
    totalTime: "5 min",
    imageUrl: "/uploads/avocado-toast.jpg",
    ingredients: [
      { name: "Pain complet", quantity: 2, unit: "tranches", imageUrl: "/uploads/pain-complet.png" },
      { name: "Avocat", quantity: 1, unit: "pièce", imageUrl: "/uploads/avocat.png" },
      { name: "Saumon fumé", quantity: 50, unit: "g", imageUrl: "/uploads/saumon.png" },
      { name: "Jus de citron", quantity: 1, unit: "cuillère à soupe", imageUrl: "/uploads/citron.png" },
      { name: "Graines de sésame", quantity: 1, unit: "cuillère à café", imageUrl: "/uploads/huile-sesame.png" }
    ],
    steps: [
      { description: "Écraser l’avocat avec le jus de citron et un peu de sel." },
      { description: "Tartiner le pain complet avec l’avocat." },
      { description: "Ajouter les tranches de saumon et parsemer de graines de sésame." }
    ],
    isChefRecipe: true,
    category: "Healthy"
  },
  {
    title: "Bowl de riz complet et tofu",
    description: "Un bowl vegan riche en protéines végétales et fibres.",
    prepTime: "10 min",
    cookTime: "15 min",
    totalTime: "25 min",
    imageUrl: "/uploads/bowl-tofu.jpg",
    ingredients: [
      { name: "Riz complet cuit", quantity: 200, unit: "g", imageUrl: "/uploads/riz.png" },
      { name: "Tofu ferme", quantity: 150, unit: "g", imageUrl: "/uploads/tofu.png" },
      { name: "Brocoli", quantity: 100, unit: "g", imageUrl: "/uploads/brocoli.png" },
      { name: "Sauce soja", quantity: 2, unit: "cuillères à soupe", imageUrl: "/uploads/soja.png" },
      { name: "Huile de sésame", quantity: 1, unit: "cuillère à soupe", imageUrl: "/uploads/huile-sesame.png" }
    ],
    steps: [
      { description: "Saisir le tofu en cubes avec un peu d’huile et sauce soja." },
      { description: "Cuire le brocoli à la vapeur." },
      { description: "Assembler dans un bol : riz, tofu, brocoli, assaisonner d’huile de sésame." }
    ],
    isChefRecipe: true,
    category: "Healthy"
  },
  {
    title: "Salade grecque revisitée",
    description: "Une version légère et fraîche avec légumes croquants et feta.",
    prepTime: "10 min",
    cookTime: "0 min",
    totalTime: "10 min",
    imageUrl: "/uploads/salade-grecque.jpg",
    ingredients: [
      { name: "Concombre", quantity: 1, unit: "pièce", imageUrl: "/uploads/concombre.png" },
      { name: "Tomates cerises", quantity: 150, unit: "g", imageUrl: "/uploads/tomates.png" },
      { name: "Feta", quantity: 50, unit: "g", imageUrl: "/uploads/feta.png" },
      { name: "Olives noires", quantity: 30, unit: "g", imageUrl: "/uploads/olives.png" },
      { name: "Huile d’olive", quantity: 1, unit: "cuillère à soupe", imageUrl: "/uploads/huile-olive.png" }
    ],
    steps: [
      { description: "Couper les légumes en dés." },
      { description: "Mélanger avec la feta et les olives." },
      { description: "Assaisonner avec huile d’olive, sel, poivre." }
    ],
    isChefRecipe: true,
    category: "Healthy"
  }
 
];

async function seed() {
  try {
    console.log("Connexion à la base MongoDB...");
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connexion réussie.");

    await Recipe.deleteMany({ category: "Healthy" });
    console.log("Anciennes recettes 'Healthy' supprimées.");

    await Recipe.insertMany(recipes);
    console.log("10 recettes 'Healthy' insérées avec succès !");

    await mongoose.disconnect();
    console.log("Déconnexion de MongoDB réussie.");
    process.exit(0);
  } catch (error) {
    console.error("Erreur lors du seed : ", error);
    process.exit(1);
  }
}

seed();
