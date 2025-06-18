require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    'https://cookneat.x75.form.efp.be', // ton frontend depuis l'EFP
    'https://cookneat.onrender.com',    // ton frontend en production
    'http://localhost:3000'             // ton frontend local
  ],
  credentials: true
}));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
app.use(express.json());
// Exemple dans ton fichier server.js ou app.js
const cors = require('cors');

const allowedOrigins = [
  'https://cookneat.x75.form.efp.be', // Remplace par l'URL réelle de ton frontend
];// Mauvais (en production) :
fetch("http://localhost:5000/api/auth/login")

// Bon :
fetch("https://ton-backend-render.onrender.com/api/auth/login")

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // si tu envoies des cookies ou des headers d'authentification
}));
// Routes
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes');
const commentRoutes = require('./routes/comments');

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/comments', commentRoutes);

// Static for uploaded images
app.use('/uploads', express.static('uploads'));

// Test route
app.get('/', (req, res) => {
  res.send('✅ API CookNeat opérationnelle');
});

// Connexion MongoDB
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connexion MongoDB réussie');
  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ Erreur MongoDB :', err.message);
});
