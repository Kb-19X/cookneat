require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS - accepte frontend local et distant
const allowedOrigins = [
  'https://cookneat.x75.form.efp.be',
  'https://cookneat.onrender.com',
  'http://localhost:3000'
];

app.use(cors({
  origin: (origin, callback) => {
    // Autorise les requêtes sans origin (Postman, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(express.json());

// Logger de requêtes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Import des routes
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes');
const commentRoutes = require('./routes/comments');

// Utilisation des routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/comments', commentRoutes);

// Fichiers statiques
app.use('/uploads', express.static('uploads'));

// Route test
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
