require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes');
const commentRoutes = require('./routes/comments');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Origines autorisées
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
      callback(new Error(`❌ CORS : accès refusé pour l’origine ${origin}`));
    }
  },
  credentials: true
}));

// 📦 Middleware JSON
app.use(express.json());

// 🖼️ Fichiers statiques pour les images
app.use('/uploads', express.static('uploads'));

// 📄 Logger simple
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// 🚦 Routes API
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/comments', commentRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/admin', adminRoutes); // ✅ corrigé ici

// 🧪 Route test
app.get('/', (req, res) => {
  res.send('✅ API CookNeat opérationnelle');
});

// 📡 Connexion MongoDB
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("❌ Erreur : MONGO_URI non défini dans .env");
  process.exit(1);
}

mongoose.connect(mongoUri)
  .then(() => {
    console.log('✅ Connexion MongoDB réussie');
    app.listen(PORT, () => {
      console.log(`🚀 Serveur en ligne sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erreur MongoDB :', err.message);
  });
