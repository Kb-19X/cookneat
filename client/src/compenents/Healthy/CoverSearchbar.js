import React, { useState, useEffect } from 'react';
import './CoverSearchbar.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import sante from '../../assets/ImageHomePage/sante.jpg';
import commentIcon from '../../assets/ImagePlatsPage/comment.png';
import likeIcon from '../../assets/ImagePlatsPage/like.png';
import shareIcon from '../../assets/ImagePlatsPage/share.png';

const API_URL = process.env.REACT_APP_API_URL || 'https://cookneat-server.onrender.com';

const CoverSearchbar = () => {
  const [recipes, setRecipes] = useState([]);
  const [likes, setLikes] = useState({});
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ category: '', ingredient: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/recipes`);
        const healthyRecipes = res.data.filter(r => r.category === "Healthy");
        setRecipes(healthyRecipes);

        const initialLikes = {};
        healthyRecipes.forEach(r => {
          initialLikes[r._id] = r.likes?.length || 0;
        });
        setLikes(initialLikes);
      } catch (err) {
        console.error("❌ Erreur lors de la récupération des recettes :", err);
      }
    };
    fetchRecipes();
  }, []);

  const handleLike = async (recipeId, e) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Vous devez être connecté pour liker.");

      const res = await axios.post(`${API_URL}/api/recipes/${recipeId}/like`, null, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });

      setLikes(prev => ({ ...prev, [recipeId]: res.data.likes?.length || prev[recipeId] + 1 }));
    } catch (err) {
      console.error("Erreur lors du like :", err.response?.data || err.message);
      alert("Erreur lors du like : " + (err.response?.data?.message || err.message));
    }
  };

  const handleRecipeClick = (id) => navigate(`/ProductPage/${id}`);
  const handleCommentClick = (id) => navigate(`/ProductPage/${id}#commentaires`);
  const handleShareClick = (e, id) => { e.stopPropagation(); alert(`Lien de la recette copié ! (${API_URL}/ProductPage/${id})`); };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const filteredRecipes = recipes
    .filter(r => r.title?.toLowerCase().includes(search.toLowerCase()))
    .filter(r => !filters.category || r.category?.toLowerCase() === filters.category.toLowerCase())
    .filter(r => !filters.ingredient || r.ingredients?.some(i => i.name.toLowerCase().includes(filters.ingredient.toLowerCase())));

  return (
    <div className="plats-body-container">
      <div className='background-cover'>
        <div className="banner-container">
          <div className="banner-left">
            <img src={sante} alt="fruits et légumes" />
            <div className="banner-overlay-heal">
              <h1>Healthy</h1>
              <p>Des plats sains, équilibrés et pleins de saveurs.</p>
            </div>
          </div>
          <div className="banner-right">
            <h2>Des plats healthy, faciles à préparer et bons pour votre santé !</h2>
            <p>
              "Explorez des recettes healthy inspirées du monde entier : un tour du monde savoureux et bon pour votre santé, depuis votre cuisine."
            </p>
          </div>
        </div>
      </div>

      <div className="rapide-header-section">
        <div className="rapide-text">
          <h1>🥗 Recettes Healthy 🥗</h1>
          <p>Moins de 20 minutes, zéro stress, 100% goût. Ces plats sont parfaits pour tous.</p>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher un plat..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Filtres modernes */}
      <div className="filters-container">
        <div className="filter-group">
          <label>Catégorie :</label>
          <select value={filters.category} onChange={e => handleFilterChange('category', e.target.value)}>
            <option value="">Toutes les recettes</option>
            <option value="Rapide & facile">Rapide & facile</option>
            <option value="Healthy">Healthy</option>
            <option value="Confort food">Confort food</option>
            <option value="Saveurs du monde">Saveurs du monde</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Ingrédient :</label>
          <input
            className="filter-ingredient"
            type="text"
            placeholder="Ex: poulet"
            value={filters.ingredient}
            onChange={e => handleFilterChange('ingredient', e.target.value)}
          />
        </div>
      </div>

      <div className="recipes-list">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map(recipe => (
            <div
              key={recipe._id}
              className="recipe-card"
              onClick={() => handleRecipeClick(recipe._id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="recipe-image">
                <img src={recipe.imageUrl?.startsWith('http') ? recipe.imageUrl : `${API_URL}${recipe.imageUrl}`} alt={recipe.title} />
              </div>
              <div className="recipe-info">
                <h3>{recipe.title}</h3>
                <p className="recipe-time">
                  ⏱️ Préparation : {recipe.prepTime || '10 min'} <br />
                  🔥 Cuisson : {recipe.cookTime || '15 min'} <br />
                  ⏳ Total : {recipe.totalTime || '25 min'}
                </p>
                {recipe.description && <p className="recipe-description">{recipe.description}</p>}

                {Array.isArray(recipe.steps) && recipe.steps.length > 0 && (
                  <div className="recipe-steps">
                    <h4>Préparation :</h4>
                    <ol>{recipe.steps.map((step, idx) => <li key={idx}>{step.description || step}</li>)}</ol>
                  </div>
                )}

                <div className="recipe-actions" onClick={e => e.stopPropagation()}>
                  <img src={likeIcon} alt="Like" onClick={e => handleLike(recipe._id, e)} style={{ cursor: 'pointer' }} />
                  <span>{likes[recipe._id] || 0}</span>
                  <img src={commentIcon} alt="Comment" onClick={() => handleCommentClick(recipe._id)} style={{ cursor: 'pointer' }} />
                  <img src={shareIcon} alt="Share" onClick={e => handleShareClick(e, recipe._id)} style={{ cursor: 'pointer' }} />
                </div>
              </div>
            </div>
          ))
        ) : <p className="no-results">Aucun plat trouvé.</p>}
      </div>
    </div>
  );
};

export default CoverSearchbar;
