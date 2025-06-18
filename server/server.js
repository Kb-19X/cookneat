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
