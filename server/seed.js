const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // adapte le chemin si besoin

const MONGO_URI = "mongodb+srv://cookadmin:cookneat123@cookneat-db.anbbadf.mongodb.net/cookneat?retryWrites=true&w=majority&appName=cookneat-db";

const recipes = [
  {
    title: "Salade de quinoa aux légumes croquants",
    description: "Un plat complet, riche en protéines végétales et vitamines.",
    prepTime: "15 min",
    cookTime: "15 min",
    totalTime: "30 min",
    imageUrl: "/uploads/salade-quinoa.jpg",
    ingredients: [
      { name: "Quinoa", quantity: 150, unit: "g", imageUrl: "/uploads/quinoa.png" },
      { name: "Concombre", quantity: 1, unit: "pièce", imageUrl: "/uploads/concombre.png" },
      { name: "Poivron rouge", quantity: 1, unit: "pièce", imageUrl: "/uploads/poivron.png" },
      { name: "Carotte", quantity: 1, unit: "pièce", imageUrl: "/uploads/carotte.png" },
      { name: "Feta", quantity: 100, unit: "g", imageUrl: "/uploads/feta.png" },
      { name: "Huile d’olive", quantity: 2, unit: "cuillères à soupe", imageUrl: "/uploads/huile-olive.png" },
      { name: "Citron", quantity: 0.5, unit: "pièce", imageUrl: "/uploads/citron.png" },
      { name: "Sel", quantity: null, unit: null, note: "à goût", imageUrl: "/uploads/sel.png" },
      { name: "Poivre", quantity: null, unit: null, note: "à goût", imageUrl: "/uploads/poivre.png" }
    ],
    steps: [
      { description: "Rincer et cuire le quinoa selon les indications." },
      { description: "Couper en petits dés le concombre, poivron et carotte." },
      { description: "Mélanger les légumes avec le quinoa refroidi." },
      { description: "Ajouter la feta émiettée." },
      { description: "Assaisonner avec huile d’olive, jus de citron, sel et poivre." },
      { description: "Servir frais." }
    ],
    isChefRecipe: true,
    category: "Confort"
  },
  {
    title: "Soupe de légumes verts detox",
    description: "Une soupe légère et détoxifiante pleine de vitamines.",
    prepTime: "10 min",
    cookTime: "20 min",
    totalTime: "30 min",
    imageUrl: "/uploads/soupe-legumes-verts.jpg",
    ingredients: [
      { name: "Brocoli", quantity: 200, unit: "g", imageUrl: "/uploads/brocoli.png" },
      { name: "Épinards frais", quantity: 100, unit: "g", imageUrl: "/uploads/epinards.png" },
      { name: "Poireau", quantity: 1, unit: "pièce", imageUrl: "/uploads/poireau.png" },
      { name: "Oignon", quantity: 1, unit: "pièce", imageUrl: "/uploads/oignon.png" },
      { name: "Bouillon de légumes", quantity: 1, unit: "l", imageUrl: "/uploads/bouillon.png" },
      { name: "Huile d’olive", quantity: 1, unit: "cuillère à soupe", imageUrl: "/uploads/huile-olive.png" },
      { name: "Sel", quantity: null, unit: null, note: "à goût", imageUrl: "/uploads/sel.png" },
      { name: "Poivre", quantity: null, unit: null, note: "à goût", imageUrl: "/uploads/poivre.png" }
    ],
    steps: [
      { description: "Émincer l’oignon et le faire revenir dans l’huile d’olive." },
      { description: "Ajouter le poireau, brocoli et bouillon, laisser cuire 15 minutes." },
      { description: "Incorporer les épinards 5 minutes avant la fin." },
      { description: "Mixer la soupe jusqu’à consistance lisse." },
      { description: "Assaisonner avec sel et poivre." },
      { description: "Servir chaud." }
    ],
    isChefRecipe: true,
    category: "Confort"
  },
  {
    title: "Buddha bowl au saumon et avocat",
    description: "Un bol équilibré avec protéines, bons gras et fibres.",
    prepTime: "20 min",
    cookTime: "10 min",
    totalTime: "30 min",
    imageUrl: "/uploads/buddha-bowl-saumon.jpg",
    ingredients: [
      { name: "Saumon frais", quantity: 150, unit: "g", imageUrl: "/uploads/saumon.png" },
      { name: "Avocat", quantity: 1, unit: "pièce", imageUrl: "/uploads/avocat.png" },
      { name: "Quinoa", quantity: 100, unit: "g", imageUrl: "/uploads/quinoa.png" },
      { name: "Carotte râpée", quantity: 50, unit: "g", imageUrl: "/uploads/carotte.png" },
      { name: "Chou rouge", quantity: 50, unit: "g", imageUrl: "/uploads/chou-rouge.png" },
      { name: "Graines de sésame", quantity: 1, unit: "cuillère à soupe", imageUrl: "/uploads/sesame.png" },
      { name: "Citron", quantity: 0.5, unit: "pièce", imageUrl: "/uploads/citron.png" },
      { name: "Sauce soja", quantity: 1, unit: "cuillère à soupe", imageUrl: "/uploads/soja.png" }
    ],
    steps: [
      { description: "Cuire le quinoa selon les instructions." },
      { description: "Faire revenir le saumon à la poêle 5 à 7 min." },
      { description: "Couper l’avocat en tranches." },
      { description: "Disposer le quinoa, légumes, saumon et avocat dans un bol." },
      { description: "Saupoudrer de graines de sésame et arroser de jus de citron et sauce soja." }
    ],
    isChefRecipe: true,
    category: "Confort"
  },
  {
    title: "Porridge aux fruits rouges",
    description: "Un petit-déjeuner sain, riche en fibres et antioxydants.",
    prepTime: "5 min",
    cookTime: "5 min",
    totalTime: "10 min",
    imageUrl: "/uploads/porridge-fruits-rouges.jpg",
    ingredients: [
      { name: "Flocons d’avoine", quantity: 50, unit: "g", imageUrl: "/uploads/avoine.png" },
      { name: "Lait d’amande", quantity: 200, unit: "ml", imageUrl: "/uploads/lait-amande.png" },
      { name: "Myrtilles", quantity: 50, unit: "g", imageUrl: "/uploads/myrtille.png" },
      { name: "Framboises", quantity: 50, unit: "g", imageUrl: "/uploads/framboise.png" },
      { name: "Miel", quantity: 1, unit: "cuillère à café", note: "facultatif", imageUrl: "/uploads/miel.png" },
      { name: "Graines de chia", quantity: 1, unit: "cuillère à soupe", imageUrl: "/uploads/chia.png" }
    ],
    steps: [
      { description: "Faire chauffer le lait d’amande dans une casserole." },
      { description: "Ajouter les flocons d’avoine et cuire à feu doux en remuant 5 minutes." },
      { description: "Verser dans un bol." },
      { description: "Ajouter les fruits rouges, graines de chia et miel." },
      { description: "Servir tiède ou froid." }
    ],
    isChefRecipe: true,
    category: "Confort"
  },
  {
    title: "Salade de pois chiches et légumes grillés",
    description: "Un plat végétarien riche en protéines et saveurs méditerranéennes.",
    prepTime: "15 min",
    cookTime: "20 min",
    totalTime: "35 min",
    imageUrl: "/uploads/salade-pois-chiches.jpg",
    ingredients: [
      { name: "Pois chiches cuits", quantity: 200, unit: "g", imageUrl: "/uploads/pois-chiches.png" },
      { name: "Courgette", quantity: 1, unit: "pièce", imageUrl: "/uploads/courgette.png" },
      { name: "Aubergine", quantity: 1, unit: "pièce", imageUrl: "/uploads/aubergine.png" },
      { name: "Poivron jaune", quantity: 1, unit: "pièce", imageUrl: "/uploads/poivron.png" },
      { name: "Oignon rouge", quantity: 1, unit: "pièce", imageUrl: "/uploads/oignon.png" },
      { name: "Huile d’olive", quantity: 3, unit: "cuillères à soupe", imageUrl: "/uploads/huile-olive.png" },
      { name: "Vinaigre balsamique", quantity: 1, unit: "cuillère à soupe", imageUrl: "/uploads/vinaigre.png" },
      { name: "Sel et poivre", quantity: null, unit: null, imageUrl: "/uploads/selpoivre.png" }
    ],
    steps: [
      { description: "Couper les légumes en morceaux et les faire griller avec un peu d’huile." },
      { description: "Mélanger les légumes grillés avec les pois chiches." },
      { description: "Ajouter l’oignon rouge finement émincé." },
      { description: "Assaisonner avec huile d’olive, vinaigre balsamique, sel et poivre." },
      { description: "Servir tiède ou froid." }
    ],
    isChefRecipe: true,
    category: "Confort"
  }
];

async function seed() {
  try {
    console.log("Connexion à la base MongoDB...");
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connexion réussie.");

    // Suppression des anciennes recettes Confort
    await Recipe.deleteMany({ category: "Confort" });
    console.log("Recettes 'Confort' supprimées.");

    // Insertion des nouvelles recettes
    await Recipe.insertMany(recipes);
    console.log("Recettes 'Confort' insérées avec succès !");

    await mongoose.disconnect();
    console.log("Déconnexion de MongoDB réussie.");
    process.exit(0);
  } catch (error) {
    console.error("Erreur lors du seed : ", error);
    process.exit(1);
  }
}

seed();
