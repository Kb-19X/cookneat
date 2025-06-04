require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//  User
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// recettes
const recipeRoutes = require('./routes/recipes');
app.use('/api/recipes', recipeRoutes);


app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('✅ API CookNeat opérationnelle');
});

// Routes
const commentsRoutes = require('./routes/comments');
app.use('/api/comments', commentsRoutes);

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connexion MongoDB réussie');
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erreur MongoDB :', err.message);
  });
