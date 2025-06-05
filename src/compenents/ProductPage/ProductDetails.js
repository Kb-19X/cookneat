// DynamicRecipePage.jsx – version optimisée sans espace inutile
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductDetails.css';
import {
  AccessTime, Schedule, Timer, Group,
  FavoriteBorder, Favorite, Star, ArrowBack
} from '@mui/icons-material';
import {
  Typography, Box, Table, TableBody,
  TableCell, TableContainer, TableHead,
  TableRow, TextField, Divider, IconButton,
  Rating, Button
} from '@mui/material';
import { motion } from 'framer-motion';

const recipe = {
  title: "Ginger Zucchini Sauté",
  servings: 4,
  prepTime: "20 min",
  cookTime: "10 min",
  totalTime: "30 min",
  description: "Un plat léger, parfumé et parfaitement équilibré pour un soir de semaine.",
  quote: "“Une façon simple et délicieuse de cuisiner la courgette.”",
  ingredients: [
    "1 c. à s. d'huile d'olive",
    "450 g de courgettes, tranchées",
    "1 c. à s. de gingembre émincé",
    "2 gousses d’ail hachées",
    "Sel et poivre"
  ],
  steps: [
    "Chauffer l’huile dans une poêle à feu moyen.",
    "Ajouter courgettes et gingembre, faire sauter 6-8 min.",
    "Ajouter l’ail, saler, poivrer.",
    "Servir chaud, accompagné si souhaité."
  ],
  nutrition: {
    calories: "180 kcal",
    protein: "5g",
    fat: "12g",
    carbs: "10g"
  },
  favorites: [
    { day: 1, meal: "Légumes sautés" },
    { day: 2, meal: "Salade de quinoa" },
    { day: 3, meal: "Pâtes aux champignons" }
  ]
};

const suggestions = [
  { name: "Salade de quinoa", img: "https://source.unsplash.com/120x90/?quinoa" },
  { name: "Soupe légère", img: "https://source.unsplash.com/120x90/?soup" },
  { name: "Pain aux céréales", img: "https://source.unsplash.com/120x90/?bread" }
];

const DynamicRecipePage = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(4);
  const [checkedSteps, setCheckedSteps] = useState([]);
  const [showStepsOnly, setShowStepsOnly] = useState(false);


  const toggleFavorite = () => setIsFavorite(!isFavorite);
  const toggleStep = (index) => {
    setCheckedSteps(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <Box className="dark-recipe-theme">
      <Box className="recipe-banner">
        <div className="banner-overlay">
          <img src="" alt="" />
          <Typography variant="h2" className="banner-title">{recipe.title}</Typography>
          <Typography variant="subtitle1" className="banner-desc">{recipe.description}</Typography>
        </div>
      </Box>
      <Box className="recipe-page">
        <header className="recipe-header">
          <Typography variant="h4" className="recipe-quote">{recipe.quote}</Typography>
          <IconButton onClick={toggleFavorite}>
            {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
        </header>
        <Box className="meta">
          <span><Group /> {recipe.servings} pers</span>
          <span><AccessTime /> {recipe.prepTime}</span>
          <span><Timer /> {recipe.cookTime}</span>
          <span><Schedule /> {recipe.totalTime}</span>
        </Box>
        <Box className="nutrition-box">
          <Typography variant="h6">Infos nutritionnelles :</Typography>
          <ul>
            <li>🔋 {recipe.nutrition.calories}</li>
            <li>🍗 {recipe.nutrition.protein} protéines</li>
            <li>🥑 {recipe.nutrition.fat} lipides</li>
            <li>🍞 {recipe.nutrition.carbs} glucides</li>
          </ul>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Button variant="outlined" onClick={() => setShowStepsOnly(!showStepsOnly)}>
            {showStepsOnly ? "Voir tout" : "Mode lecture"}
          </Button>
        </Box>
        {!showStepsOnly && (
          <>
            <motion.div className="section" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
              <Typography variant="h5" className="section-title">📝 Ingrédients</Typography>
              <div className="ingredients-grid">
                {recipe.ingredients.map((item, i) => (
                  <motion.div key={i} className="ingredient-card" whileHover={{ scale: 1.05, rotate: -1 }} whileTap={{ scale: 0.97 }}>{item}</motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div className="section chef-tip-box" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
              <Typography variant="h5" className="section-title">👨‍🍳 Astuce du chef</Typography>
              <p>Ajoutez une touche de citron ou de menthe fraîche pour encore plus de fraîcheur !</p>
            </motion.div>
          </>
        )}
        <motion.div className="section" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
          <Typography variant="h5" className="section-title">👨‍🍳 Étapes</Typography>
          <ol className="checklist">
            {recipe.steps.map((step, index) => (
              <li key={index} className={checkedSteps.includes(index) ? 'checked' : ''} onClick={() => toggleStep(index)}>
                <input type="checkbox" readOnly checked={checkedSteps.includes(index)} />
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </motion.div>
        {!showStepsOnly && (
          <>
            <motion.div className="section" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
              <Typography variant="h5" className="section-title">⭐ Votre note</Typography>
              <Rating value={rating} onChange={(e, newValue) => setRating(newValue)} precision={0.5} icon={<Star fontSize="inherit" htmlColor="#DA8359" />} />
            </motion.div>
            <motion.div className="section" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
              <Typography variant="h5" className="section-title">🗒️ Vos notes</Typography>
              <TextField placeholder="Écrivez vos astuces ou variantes..." multiline rows={4} fullWidth variant="outlined" />
            </motion.div>
            <motion.div className="section suggestions-box" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }}>
              <Typography variant="h5" className="section-title">🍽️ Ce plat va bien avec :</Typography>
              <div className="suggestions-list">
                {suggestions.map((sugg, i) => (
                  <div className="suggestion-card" key={i}>
                    <img src={sugg.img} alt={sugg.name} />
                    <span>{sugg.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div className="section" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
              <Typography variant="h5" className="section-title">📅 Recettes favorites</Typography>
              <Divider sx={{ margin: '1rem 0' }} />
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Jour</TableCell>
                      <TableCell>Menu</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recipe.favorites.map((fav, index) => (
                      <TableRow key={index}>
                        <TableCell>{fav.day}</TableCell>
                        <TableCell>{fav.meal}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </motion.div>
          </>
        )}
      </Box>
    </Box>
  );
};

export default DynamicRecipePage;
