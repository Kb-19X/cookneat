const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware CORS configuré pour Render
app.use(cors({
  origin: [
    'https://cookneal.onrender.com', // Remplacez par l'URL réelle de votre frontend
    'http://localhost:3000' // Pour le développement local
  ],
  credentials: true
}));

app.use(bodyParser.json());

// Connecter MongoDB Atlas
const URI = 'mongodb+srv://davidmnr571:fMnGnvu5clhYJBbm@cookneatcluster.t55e9.mongodb.net/?retryWrites=true&w=majority&appName=CookNeatClusternp';

mongoose.connect(URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Définir un modèle MongoDB
const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
});
const Item = mongoose.model('Item', ItemSchema);

// Routes API
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route de test
app.get('/api/test', (req, res) => {
  res.json({ message: 'API fonctionne correctement!' });
});

// Route pour les recettes (si vous en avez besoin)
app.get('/api/recipes', async (req, res) => {
  try {
    // Remplacez par votre logique de récupération des recettes
    const recipes = []; // Votre logique ici
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Démarrer le serveur - IMPORTANT pour Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});