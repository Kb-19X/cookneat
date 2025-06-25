require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// 🌐 Liste des origines autorisées
const allowedOrigins = [
  'https://cookneat.x75.form.efp.be',
  'https://cookneat.onrender.com',
  'http://localhost:3000'
];

// 🛡️ Middleware CORS
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// 📦 Middleware pour parser le JSON
app.use(express.json());

// 🖼️ Fichiers statiques
app.use('/uploads', express.static('uploads'));

// 📄 Logger simple
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// 📁 Imports de routes
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes');
const commentRoutes = require('./routes/comments');

// 🚦 Utilisation des routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/comments', commentRoutes);

// 🧪 Route de test
app.get('/', (req, res) => {
  res.send('✅ API CookNeat opérationnelle');
});

// 📡 Connexion MongoDB
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("❌ Erreur : MONGO_URI non défini dans .env");
  process.exit(1);
}

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✅ Connexion MongoDB réussie');
    app.listen(PORT, () => {
      console.log(`🚀 Serveur en ligne sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erreur MongoDB :', err.message);
  });
