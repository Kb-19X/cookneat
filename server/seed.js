const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // adapte le chemin si besoin

const MONGO_URI = "mongodb+srv://cookadmin:cookneat123@cookneat-db.anbbadf.mongodb.net/cookneat?retryWrites=true&w=majority&appName=cookneat-db";

const recipes = [
  {
    title: "Paella valencienne",
    description: "Plat espagnol riche en saveurs, mélange de riz, fruits de mer, poulet et légumes.",
    prepTime: "20 min",
    cookTime: "40 min",
    totalTime: "1h",
    imageUrl: "/uploads/paella.jpg",
    ingredients: [
      { name: "Riz rond", quantity: 300, unit: "g", imageUrl: "/uploads/riz.png" },
      { name: "Poulet", quantity: 400, unit: "g", imageUrl: "/uploads/poulet.png" },
      { name: "Crevettes", quantity: 200, unit: "g", imageUrl: "/uploads/crevettes.png" },
      { name: "Poivrons rouges", quantity: 2, unit: "pièces", imageUrl: "/uploads/poivron.png" },
      { name: "Haricots verts", quantity: 100, unit: "g", imageUrl: "/uploads/haricots-verts.png" },
      { name: "Tomates concassées", quantity: 400, unit: "g", imageUrl: "/uploads/tomates.png" },
      { name: "Safran", quantity: 1, unit: "pincée", imageUrl: "/uploads/safran.png" },
      { name: "Bouillon de volaille", quantity: 750, unit: "ml", imageUrl: "/uploads/bouillon.png" },
      { name: "Huile d’olive", quantity: 3, unit: "cuillères à soupe", imageUrl: "/uploads/huile-olive.png" },
      { name: "Sel et poivre", quantity: null, unit: null, imageUrl: "/uploads/selpoivre.png" }
    ],
    steps: [
      { description: "Faire revenir le poulet dans l’huile d’olive jusqu’à coloration." },
      { description: "Ajouter les poivrons coupés en lanières et les haricots verts, cuire 5 min." },
      { description: "Ajouter le riz, remuer pour bien l’enrober d’huile." },
      { description: "Verser les tomates, le bouillon chaud, le safran, saler et poivrer." },
      { description: "Cuire à feu moyen 20 min sans remuer." },
      { description: "Ajouter les crevettes 5 min avant la fin de la cuisson." },
      { description: "Laisser reposer 5 min avant de servir." }
    ],
    isChefRecipe: true,
    category: "Saveurs du monde"
  },
  
  {
    title: "Curry de légumes à l’indienne",
    description: "Plat végétarien parfumé, mélange de légumes dans une sauce épicée au lait de coco.",
    prepTime: "15 min",
    cookTime: "30 min",
    totalTime: "45 min",
    imageUrl: "/uploads/curry-legumes.jpg",
    ingredients: [
      { name: "Pommes de terre", quantity: 300, unit: "g", imageUrl: "/uploads/pommes-de-terre.png" },
      { name: "Carottes", quantity: 200, unit: "g", imageUrl: "/uploads/carottes.png" },
      { name: "Pois chiches cuits", quantity: 200, unit: "g", imageUrl: "/uploads/pois-chiches.png" },
      { name: "Lait de coco", quantity: 400, unit: "ml", imageUrl: "/uploads/lait-coco.png" },
      { name: "Oignon", quantity: 1, unit: "pièce", imageUrl: "/uploads/oignon.png" },
      { name: "Ail", quantity: 2, unit: "gousses", imageUrl: "/uploads/ail.png" },
      { name: "Pâte de curry", quantity: 2, unit: "cuillères à soupe", imageUrl: "/uploads/curry.png" },
      { name: "Huile végétale", quantity: 2, unit: "cuillères à soupe", imageUrl: "/uploads/huile.png" },
      { name: "Coriandre fraîche", quantity: null, unit: null, note: "pour la garniture", imageUrl: "/uploads/coriandre.png" },
      { name: "Sel et poivre", quantity: null, unit: null, imageUrl: "/uploads/selpoivre.png" }
    ],
    steps: [
      { description: "Faire revenir l’oignon et l’ail hachés dans l’huile." },
      { description: "Ajouter les pommes de terre et carottes coupées, cuire 5 min." },
      { description: "Incorporer la pâte de curry, bien mélanger." },
      { description: "Verser le lait de coco, ajouter les pois chiches." },
      { description: "Laisser mijoter 20 min jusqu’à tendreté des légumes." },
      { description: "Assaisonner, parsemer de coriandre avant de servir." }
    ],
    isChefRecipe: true,
    category: "Saveurs du monde"
  },
  
  {
    title: "Bibimbap coréen",
    description: "Plat coréen coloré avec riz, légumes sautés, viande et œuf au plat.",
    prepTime: "25 min",
    cookTime: "15 min",
    totalTime: "40 min",
    imageUrl: "/uploads/bibimbap.jpg",
    ingredients: [
      { name: "Riz blanc cuit", quantity: 300, unit: "g", imageUrl: "/uploads/riz.png" },
      { name: "Épinards", quantity: 150, unit: "g", imageUrl: "/uploads/epinards.png" },
      { name: "Carottes", quantity: 100, unit: "g", imageUrl: "/uploads/carottes.png" },
      { name: "Champignons shiitake", quantity: 100, unit: "g", imageUrl: "/uploads/champignons.png" },
      { name: "Bœuf émincé", quantity: 150, unit: "g", imageUrl: "/uploads/boeuf.png" },
      { name: "Œufs", quantity: 2, unit: "pièces", imageUrl: "/uploads/oeuf.png" },
      { name: "Sauce gochujang", quantity: 2, unit: "cuillères à soupe", imageUrl: "/uploads/gochujang.png" },
      { name: "Huile de sésame", quantity: 1, unit: "cuillère à soupe", imageUrl: "/uploads/huile-sesame.png" },
      { name: "Ail", quantity: 1, unit: "gousse", imageUrl: "/uploads/ail.png" },
      { name: "Sel et poivre", quantity: null, unit: null, imageUrl: "/uploads/selpoivre.png" }
    ],
    steps: [
      { description: "Faire sauter séparément les épinards, carottes, champignons avec un peu d’huile et ail." },
      { description: "Cuire le bœuf émincé avec sel, poivre et huile de sésame." },
      { description: "Faire cuire les œufs au plat." },
      { description: "Dans un bol, disposer le riz puis les légumes, le bœuf." },
      { description: "Ajouter l’œuf au plat sur le dessus." },
      { description: "Servir avec la sauce gochujang à côté." }
    ],
    isChefRecipe: true,
    category: "Saveurs du monde"
  },
  
  {
    title: "Shakshuka tunisienne",
    description: "Œufs pochés dans une sauce tomate épicée avec poivrons et cumin.",
    prepTime: "10 min",
    cookTime: "25 min",
    totalTime: "35 min",
    imageUrl: "/uploads/shakshuka.jpg",
    ingredients: [
      { name: "Œufs", quantity: 4, unit: "pièces", imageUrl: "/uploads/oeuf.png" },
      { name: "Tomates pelées", quantity: 400, unit: "g", imageUrl: "/uploads/tomates.png" },
      { name: "Poivrons rouges", quantity: 1, unit: "pièce", imageUrl: "/uploads/poivron.png" },
      { name: "Oignon", quantity: 1, unit: "pièce", imageUrl: "/uploads/oignon.png" },
      { name: "Ail", quantity: 2, unit: "gousses", imageUrl: "/uploads/ail.png" },
      { name: "Cumin", quantity: 1, unit: "cuillère à café", imageUrl: "/uploads/cumin.png" },
      { name: "Paprika", quantity: 1, unit: "cuillère à café", imageUrl: "/uploads/paprika.png" },
      { name: "Huile d’olive", quantity: 2, unit: "cuillères à soupe", imageUrl: "/uploads/huile-olive.png" },
      { name: "Sel et poivre", quantity: null, unit: null, imageUrl: "/uploads/selpoivre.png" }
    ],
    steps: [
      { description: "Faire revenir oignon, ail, poivron dans l’huile d’olive." },
      { description: "Ajouter les tomates, cumin, paprika, sel, poivre." },
      { description: "Laisser mijoter 15 min jusqu’à épaississement." },
      { description: "Casser les œufs dans la sauce, couvrir et cuire 10 min." },
      { description: "Servir chaud avec du pain." }
    ],
    isChefRecipe: true,
    category: "Saveurs du monde"
  },
  
  {
    title: "Pavlova aux fruits rouges",
    description: "Dessert léger à base de meringue croustillante et fruits rouges frais.",
    prepTime: "20 min",
    cookTime: "1h",
    totalTime: "1h20",
    imageUrl: "/uploads/pavlova.jpg",
    ingredients: [
      { name: "Blancs d’œufs", quantity: 4, unit: "pièces", imageUrl: "/uploads/oeuf.png" },
      { name: "Sucre", quantity: 200, unit: "g", imageUrl: "/uploads/sucre.png" },
      { name: "Crème fraîche épaisse", quantity: 250, unit: "g", imageUrl: "/uploads/creme.png" },
      { name: "Fruits rouges (fraises, framboises, myrtilles)", quantity: 300, unit: "g", imageUrl: "/uploads/fruits-rouges.png" },
      { name: "Extrait de vanille", quantity: 1, unit: "cuillère à café", imageUrl: "/uploads/vanille.png" }
    ],
    steps: [
      { description: "Monter les blancs en neige ferme en incorporant le sucre progressivement." },
      { description: "Former un cercle sur une plaque recouverte de papier cuisson." },
      { description: "Cuire au four à 120°C pendant 1h, puis laisser refroidir dans le four éteint." },
      { description: "Monter la crème avec la vanille en chantilly." },
      { description: "Déposer la chantilly sur la meringue refroidie." },
      { description: "Décorer avec les fruits rouges frais avant de servir." }
    ],
    isChefRecipe: true,
    category: "Desserts"
  }
];


async function seed() {
  try {
    console.log("Connexion à la base MongoDB...");
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connexion réussie.");

    // Pour nettoyer les anciennes recettes de cette catégorie :
    // await Recipe.deleteMany({ category: "Saveurs du monde" });
    // console.log("Recettes 'Saveurs du monde' supprimées.");

    await Recipe.insertMany(recipes);
    console.log("Recettes 'Saveurs du monde' insérées avec succès !");

    await mongoose.disconnect();
    console.log("Déconnexion de MongoDB réussie.");
    process.exit(0);
  } catch (error) {
    console.error("Erreur lors du seed : ", error);
    process.exit(1);
  }
}

seed();
