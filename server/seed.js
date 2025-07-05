
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Recipe = require('./models/recipe.model'); // ajuste le chemin si besoin

dotenv.config();

// 🔐 URI explicite si process.env.MONGODB_URI est undefined
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://cookadmin:cookneat123@cookneat-db.anbbadf.mongodb.net/cookneat?retryWrites=true&w=majority&appName=cookneat-db';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ Connecté à MongoDB');
    seedData();
  })
  .catch((err) => console.error('❌ Erreur MongoDB :', err));

const recipes = [
  {
    "title": "Wrap au poulet grillé",
    "description": "Une recette rapide, équilibrée et savoureuse à préparer en quelques minutes.",
    "ingredients": [
      "1 wrap",
      "100g de poulet",
      "1 feuille de laitue",
      "1 c. à soupe de sauce yaourt"
    ],
    "steps": [
      "Cuire les pâtes.",
      "Faire revenir l’ail dans l’huile.",
      "Mélanger et servir."
    ],
    "prepTime": "5 min",
    "cookTime": "8 min",
    "totalTime": "15 min",
    "difficulty": "facile",
    "category": "rapide-facile",
    "tags": [
      "rapide",
      "express"
    ],
    "imageUrl": "https://source.unsplash.com/800x600/?wrap,food"
  },
  {
    "title": "Salade de thon express",
    "description": "Un plat simple et efficace pour les jours pressés.",
    "ingredients": [
      "2 œufs",
      "champignons émincés",
      "sel, poivre",
      "huile d’olive"
    ],
    "steps": [
      "Faire griller le pain.",
      "Cuire l’œuf et écraser l’avocat.",
      "Assembler le tout."
    ],
    "prepTime": "5 min",
    "cookTime": "10 min",
    "totalTime": "15 min",
    "difficulty": "facile",
    "category": "rapide-facile",
    "tags": [
      "rapide",
      "express"
    ],
    "imageUrl": "https://source.unsplash.com/800x600/?salad,tuna"
  },
  {
    "title": "Tartine avocat & œuf",
    "description": "Des saveurs simples et authentiques prêtes en un clin d'œil.",
    "ingredients": [
      "1 boîte de thon",
      "1 tomate",
      "maïs",
      "huile d'olive",
      "sel, poivre"
    ],
    "steps": [
      "Battre les œufs.",
      "Cuire les champignons puis ajouter les œufs.",
      "Servir chaud."
    ],
    "prepTime": "5 min",
    "cookTime": "10 min",
    "totalTime": "15 min",
    "difficulty": "facile",
    "category": "rapide-facile",
    "tags": [
      "rapide",
      "express"
    ],
    "imageUrl": "https://source.unsplash.com/800x600/?avocado,toast"
  },
  {
    "title": "Omelette aux champignons",
    "description": "Un plat simple et efficace pour les jours pressés.",
    "ingredients": [
      "1 boîte de thon",
      "1 tomate",
      "maïs",
      "huile d'olive",
      "sel, poivre"
    ],
    "steps": [
      "Mélanger tous les ingrédients dans un bol.",
      "Assaisonner.",
      "Servir frais."
    ],
    "prepTime": "5 min",
    "cookTime": "5 min",
    "totalTime": "15 min",
    "difficulty": "facile",
    "category": "rapide-facile",
    "tags": [
      "rapide",
      "express"
    ],
    "imageUrl": "https://source.unsplash.com/800x600/?omelette"
  },
  {
    "title": "Pâtes ail et huile",
    "description": "Des saveurs simples et authentiques prêtes en un clin d'œil.",
    "ingredients": [
      "100g de pâtes",
      "2 gousses d’ail",
      "huile d’olive",
      "persil"
    ],
    "steps": [
      "Mélanger tous les ingrédients dans un bol.",
      "Assaisonner.",
      "Servir frais."
    ],
    "prepTime": "5 min",
    "cookTime": "10 min",
    "totalTime": "15 min",
    "difficulty": "facile",
    "category": "rapide-facile",
    "tags": [
      "rapide",
      "express"
    ],
    "imageUrl": "https://source.unsplash.com/800x600/?pasta,garlic"
  },
  {
    "title": "Sandwich au saumon fumé",
    "description": "Un plat simple et efficace pour les jours pressés.",
    "ingredients": [
      "1 wrap",
      "100g de poulet",
      "1 feuille de laitue",
      "1 c. à soupe de sauce yaourt"
    ],
    "steps": [
      "Préparer les ingrédients.",
      "Cuire les éléments si nécessaire.",
      "Assembler et servir."
    ],
    "prepTime": "5 min",
    "cookTime": "9 min",
    "totalTime": "15 min",
    "difficulty": "facile",
    "category": "rapide-facile",
    "tags": [
      "rapide",
      "express"
    ],
    "imageUrl": "https://source.unsplash.com/800x600/?sandwich,salmon"
  },
  {
    "title": "Soupe de légumes rapide",
    "description": "Des saveurs simples et authentiques prêtes en un clin d'œil.",
    "ingredients": [
      "2 œufs",
      "champignons émincés",
      "sel, poivre",
      "huile d’olive"
    ],
    "steps": [
      "Faire griller le pain.",
      "Cuire l’œuf et écraser l’avocat.",
      "Assembler le tout."
    ],
    "prepTime": "5 min",
    "cookTime": "7 min",
    "totalTime": "15 min",
    "difficulty": "facile",
    "category": "rapide-facile",
    "tags": [
      "rapide",
      "express"
    ],
    "imageUrl": "https://source.unsplash.com/800x600/?vegetable,soup"
  },
  {
    "title": "Croque-monsieur au jambon",
    "description": "Un plat simple et efficace pour les jours pressés.",
    "ingredients": [
      "1 tranche de pain",
      "1/2 avocat",
      "1 œuf",
      "jus de citron",
      "sel"
    ],
    "steps": [
      "Faire griller le pain.",
      "Cuire l’œuf et écraser l’avocat.",
      "Assembler le tout."
    ],
    "prepTime": "5 min",
    "cookTime": "8 min",
    "totalTime": "15 min",
    "difficulty": "facile",
    "category": "rapide-facile",
    "tags": [
      "rapide",
      "express"
    ],
    "imageUrl": "https://source.unsplash.com/800x600/?croque-monsieur"
  },
  {
    "title": "Nouilles sautées au poulet",
    "description": "Une recette rapide, équilibrée et savoureuse à préparer en quelques minutes.",
    "ingredients": [
      "1 boîte de thon",
      "1 tomate",
      "maïs",
      "huile d'olive",
      "sel, poivre"
    ],
    "steps": [
      "Mélanger tous les ingrédients dans un bol.",
      "Assaisonner.",
      "Servir frais."
    ],
    "prepTime": "5 min",
    "cookTime": "10 min",
    "totalTime": "15 min",
    "difficulty": "facile",
    "category": "rapide-facile",
    "tags": [
      "rapide",
      "express"
    ],
    "imageUrl": "https://source.unsplash.com/800x600/?noodles,chicken"
  },
  {
    "title": "Bowl riz, légumes & œuf",
    "description": "Une idée rapide et gourmande pour se régaler sans stress.",
    "ingredients": [
      "2 œufs",
      "champignons émincés",
      "sel, poivre",
      "huile d’olive"
    ],
    "steps": [
      "Faire griller le pain.",
      "Cuire l’œuf et écraser l’avocat.",
      "Assembler le tout."
    ],
    "prepTime": "5 min",
    "cookTime": "5 min",
    "totalTime": "15 min",
    "difficulty": "facile",
    "category": "rapide-facile",
    "tags": [
      "rapide",
      "express"
    ],
    "imageUrl": "https://source.unsplash.com/800x600/?bowl,egg"
  },
  {
    "title": "Quesadillas fromage",
    "description": "Un plat simple et efficace pour les jours pressés.",
    "ingredients": [
      "1 wrap",
      "100g de poulet",
      "1 feuille de laitue",
      "1 c. à soupe de sauce yaourt"
    ],
    "steps": [
      "Faire griller le pain.",
      "Cuire l’œuf et écraser l’avocat.",
      "Assembler le tout."
    ],
    "prepTime": "5 min",
    "cookTime": "7 min",
    "totalTime": "15 min",
    "difficulty": "facile",
    "category": "rapide-facile",
    "tags": [
      "rapide",
      "express"
    ],
    "imageUrl": "https://source.unsplash.com/800x600/?quesadilla"
  },
  {
    "title": "Salade grecque minute",
    "description": "Des saveurs simples et authentiques prêtes en un clin d'œil.",
    "ingredients": [
      "2 œufs",
      "champignons émincés",
      "sel, poivre",
      "huile d’olive"
    ],
    "steps": [
      "Cuire les pâtes.",
      "Faire revenir l’ail dans l’huile.",
      "Mélanger et servir."
    ],
    "prepTime": "5 min",
    "cookTime": "5 min",
    "totalTime": "15 min",
    "difficulty": "facile",
    "category": "rapide-facile",
    "tags": [
      "rapide",
      "express"
    ],
    "imageUrl": "https://source.unsplash.com/800x600/?greek,salad"
  },
  {
    "title": "Toasts chèvre miel",
    "description": "Une idée rapide et gourmande pour se régaler sans stress.",
    "ingredients": [
      "100g de pâtes",
      "2 gousses d’ail",
      "huile d’olive",
      "persil"
    ],
    "steps": [
      "Battre les œufs.",
      "Cuire les champignons puis ajouter les œufs.",
      "Servir chaud."
    ],
    "prepTime": "5 min",
    "cookTime": "7 min",
    "totalTime": "15 min",
    "difficulty": "facile",
    "category": "rapide-facile",
    "tags": [
      "rapide",
      "express"
    ],
    "imageUrl": "https://source.unsplash.com/800x600/?goatcheese,honey"
  },
  {
    "title": "Pizza tortilla express",
    "description": "Une idée rapide et gourmande pour se régaler sans stress.",
    "ingredients": [
      "2 œufs",
      "champignons émincés",
      "sel, poivre",
      "huile d’olive"
    ],
    "steps": [
      "Faire griller le pain.",
      "Cuire l’œuf et écraser l’avocat.",
      "Assembler le tout."
    ],
    "prepTime": "5 min",
    "cookTime": "9 min",
    "totalTime": "15 min",
    "difficulty": "facile",
    "category": "rapide-facile",
    "tags": [
      "rapide",
      "express"
    ],
    "imageUrl": "https://source.unsplash.com/800x600/?pizza,tortilla"
  },
  {
    "title": "Poêlée de crevettes à l'ail",
    "description": "Un plat simple et efficace pour les jours pressés.",
    "ingredients": [
      "1 tranche de pain",
      "1/2 avocat",
      "1 œuf",
      "jus de citron",
      "sel"
    ],
    "steps": [
      "Battre les œufs.",
      "Cuire les champignons puis ajouter les œufs.",
      "Servir chaud."
    ],
    "prepTime": "5 min",
    "cookTime": "8 min",
    "totalTime": "15 min",
    "difficulty": "facile",
    "category": "rapide-facile",
    "tags": [
      "rapide",
      "express"
    ],
    "imageUrl": "https://source.unsplash.com/800x600/?shrimp,garlic"
  },
  {
    "title": "Taboulé aux herbes",
    "description": "Une recette rapide, équilibrée et savoureuse à préparer en quelques minutes.",
    "ingredients": [
      "2 œufs",
      "champignons émincés",
      "sel, poivre",
      "huile d’olive"
    ],
    "steps": [
      "Battre les œufs.",
      "Cuire les champignons puis ajouter les œufs.",
      "Servir chaud."
    ],
    "prepTime": "5 min",
    "cookTime": "5 min",
    "totalTime": "15 min",
    "difficulty": "facile",
    "category": "rapide-facile",
    "tags": [
      "rapide",
      "express"
    ],
    "imageUrl": "https://source.unsplash.com/800x600/?tabbouleh"
  },
  {
    "title": "Smoothie banane & avoine",
    "description": "Une idée rapide et gourmande pour se régaler sans stress.",
    "ingredients": [
      "1 tranche de pain",
      "1/2 avocat",
      "1 œuf",
      "jus de citron",
      "sel"
    ],
    "steps": [
      "Battre les œufs.",
      "Cuire les champignons puis ajouter les œufs.",
      "Servir chaud."
    ],
    "prepTime": "5 min",
    "cookTime": "10 min",
    "totalTime": "15 min",
    "difficulty": "facile",
    "category": "rapide-facile",
    "tags": [
      "rapide",
      "express"
    ],
    "imageUrl": "https://source.unsplash.com/800x600/?smoothie,banana"
  },
  {
    "title": "Tacos au bœuf rapide",
    "description": "Idéal pour un déjeuner léger, complet et plein de goût.",
    "ingredients": [
      "1 wrap",
      "100g de poulet",
      "1 feuille de laitue",
      "1 c. à soupe de sauce yaourt"
    ],
    "steps": [
      "Battre les œufs.",
      "Cuire les champignons puis ajouter les œufs.",
      "Servir chaud."
    ],
    "prepTime": "5 min",
    "cookTime": "8 min",
    "totalTime": "15 min",
    "difficulty": "facile",
    "category": "rapide-facile",
    "tags": [
      "rapide",
      "express"
    ],
    "imageUrl": "https://source.unsplash.com/800x600/?taco,beef"
  },
  {
    "title": "Gratin express courgettes",
    "description": "Une idée rapide et gourmande pour se régaler sans stress.",
    "ingredients": [
      "2 œufs",
      "champignons émincés",
      "sel, poivre",
      "huile d’olive"
    ],
    "steps": [
      "Battre les œufs.",
      "Cuire les champignons puis ajouter les œufs.",
      "Servir chaud."
    ],
    "prepTime": "5 min",
    "cookTime": "5 min",
    "totalTime": "15 min",
    "difficulty": "facile",
    "category": "rapide-facile",
    "tags": [
      "rapide",
      "express"
    ],
    "imageUrl": "https://source.unsplash.com/800x600/?gratin,zucchini"
  },
  {
    "title": "Buddha bowl thon avocat",
    "description": "Une idée rapide et gourmande pour se régaler sans stress.",
    "ingredients": [
      "1 wrap",
      "100g de poulet",
      "1 feuille de laitue",
      "1 c. à soupe de sauce yaourt"
    ],
    "steps": [
      "Mélanger tous les ingrédients dans un bol.",
      "Assaisonner.",
      "Servir frais."
    ],
    "prepTime": "5 min",
    "cookTime": "5 min",
    "totalTime": "15 min",
    "difficulty": "facile",
    "category": "rapide-facile",
    "tags": [
      "rapide",
      "express"
    ],
    "imageUrl": "https://source.unsplash.com/800x600/?buddhabowl,avocado"
  }
];

async function seedData() {
  try {
    await Recipe.deleteMany({ category: 'rapide-facile' });
    await Recipe.insertMany(recipes);
    console.log('🍽️ Recettes "Rapide & Facile" insérées avec succès.');
    process.exit();
  } catch (error) {
    console.error('❌ Erreur lors du seed :', error);
    process.exit(1);
  }
}
