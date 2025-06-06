const fetch = require('node-fetch'); // Assure-toi d'avoir installé ce package : npm install node-fetch@2

const token = 'VOTRE_TOKEN_ICI'; // remplace par un vrai token

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const createRecipe = async (i) => {
  try {
    const response = await fetch('http://localhost:5000/api/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: `Recette ${i}`,
        description: `Description de la recette ${i}`,
        imageUrl: '/uploads/default.jpg',
        ingredients: ['Ingrédient 1', 'Ingrédient 2'],
        steps: [{ text: 'Étape 1' }, { text: 'Étape 2' }]
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error(`❌ Erreur à la recette ${i} :`, error);
    } else {
      const data = await response.json();
      console.log(`✅ Recette ${i} créée :`, data._id);
    }
  } catch (err) {
    console.error(`❌ Erreur réseau à la recette ${i} :`, err.message);
  }
};

const run = async () => {
  for (let i = 1; i <= 100; i++) {
    await createRecipe(i);
    await sleep(200); // 200 ms entre chaque requête
  }
};


run();
