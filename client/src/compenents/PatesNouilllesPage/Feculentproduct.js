import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import commentIcon from '../../assets/ImagePlatsPage/comment.png';
import likeIcon from '../../assets/ImagePlatsPage/like.png';
import shareIcon from '../../assets/ImagePlatsPage/share.png';
import burger from '../../assets/ImageHomePage/burger.jpg';

const API_URL = process.env.REACT_APP_API_URL || 'https://cookneat-server.onrender.com';

const Feculentproduct = () => {
  const [recipes, setRecipes] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [showComment, setShowComment] = useState(null);
  const [commentInput, setCommentInput] = useState({});
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ category: '', ingredient: '' });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/recipes`);
        const comfortFoodRecipes = res.data.filter((r) => r.category === 'Confort');
        setRecipes(comfortFoodRecipes);

        const initialLikes = {};
        comfortFoodRecipes.forEach((r) => {
          initialLikes[r._id] = r.likes?.length || 0;
        });
        setLikes(initialLikes);
      } catch (err) {
        console.error("❌ Erreur lors de la récupération des recettes :", err);
      }
    };

    fetchRecipes();
  }, []);

  const fetchRecipeComments = async (recipeId) => {
    try {
      const res = await axios.get(`${API_URL}/api/comments?recipeId=${recipeId}`);
      setComments((prev) => ({ ...prev, [recipeId]: res.data }));
    } catch (err) {
      console.error('Erreur lors de la récupération des commentaires :', err);
    }
  };

  const toggleCommentSection = (id) => {
    if (showComment === id) {
      setShowComment(null);
    } else {
      setShowComment(id);
      fetchRecipeComments(id);
    }
  };

  const handleCommentInputChange = (id, value) => {
    setCommentInput((prev) => ({ ...prev, [id]: value }));
  };

  const submitComment = async (recipeId) => {
    const text = commentInput[recipeId]?.trim();
    if (!text) return alert("Le commentaire ne peut pas être vide.");

    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Vous devez être connecté pour commenter.");

      await axios.post(`${API_URL}/api/comments`, { recipeId, text, rating: 5 }, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });

      setCommentInput((prev) => ({ ...prev, [recipeId]: '' }));
      fetchRecipeComments(recipeId);
    } catch (err) {
      console.error("Erreur lors de l'envoi du commentaire :", err.response?.data || err.message);
      alert("Erreur lors de l'envoi du commentaire : " + (err.response?.data?.error || err.message));
    }
  };

  const handleLike = async (recipeId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Vous devez être connecté pour liker.");

      const res = await axios.post(`${API_URL}/api/recipes/${recipeId}/like`, null, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
      });

      setLikes((prev) => ({ ...prev, [recipeId]: res.data.likes }));
    } catch (err) {
      console.error("Erreur lors du like :", err.response?.data || err.message);
      alert("Erreur lors du like : " + (err.response?.data?.message || err.message));
    }
  };

  const handleCardClick = (id) => navigate(`/productpage/${id}`);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const filteredRecipes = recipes
    .filter(recipe => recipe.title.toLowerCase().includes(search.toLowerCase()))
    .filter(r => !filters.category || r.category?.toLowerCase() === filters.category.toLowerCase())
    .filter(r => !filters.ingredient || r.ingredients?.some(i => i.name.toLowerCase().includes(filters.ingredient.toLowerCase())));

  return (
    <div className="plats-body-container">
      <div className='background-cover'>
        <div className="banner-container">
          <div className="banner-left">
            <img src={burger} alt="comfort food" />
            <div className="banner-overlay-heal">
              <h1>Comfort Food</h1>
              <p><strong>Des recettes</strong> <em>réconfortantes</em> et <strong>gourmandes</strong>.</p>
            </div>
          </div>
          <div className="banner-right">
            <h2>Des plats savoureux pour se faire plaisir</h2>
            <p>"Des plats simples, chaleureux, parfaits pour les journées cocooning ou les gros appétits."</p>
          </div>
        </div>
      </div>

      <div className="rapide-header-section">
        <div className="rapide-text">
          <h1>🍔 Recettes Comfort Food 🍔</h1>
          <p>Des plats généreux, faciles à préparer et ultra réconfortants.</p>
          <div className="rapide-benefits">
            <div className="benefit-box">🍽️ Gourmand et copieux</div>
            <div className="benefit-box">👩‍🍳 Accessible à tous</div>
            <div className="benefit-box">🛒 Ingrédients simples</div>
          </div>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher un plat comfort food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filtres */}
      <div className="filters-container">
        <div className="filter-group">
          <label>Catégorie :</label>
          <select value={filters.category} onChange={(e) => handleFilterChange('category', e.target.value)}>
            <option value="">Toutes les recettes</option>
            <option value="Rapide & facile">Rapide & facile</option>
            <option value="Healthy">Healthy</option>
            <option value="Confort">Confort</option>
            <option value="Saveurs du monde">Saveurs du monde</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Ingrédient :</label>
          <input
            className='filter-ingredient'
            type="text"
            placeholder="Ex: poulet"
            value={filters.ingredient}
            onChange={(e) => handleFilterChange('ingredient', e.target.value)}
          />
        </div>
      </div>

      <div className="recipes-list">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div key={recipe._id} className="recipe-card" onClick={() => handleCardClick(recipe._id)} style={{ cursor: 'pointer' }}>
              <div className="recipe-image">
                <img
                  src={recipe.imageUrl?.startsWith('http') ? recipe.imageUrl : `${API_URL}${recipe.imageUrl}`}
                  alt={recipe.title}
                />
              </div>
              <div className="recipe-info">
                <h3>{recipe.title}</h3>
                <p className="recipe-time">
                  ⏱️ Préparation : {recipe.prepTime || '10 min'}<br />
                  🔥 Cuisson : {recipe.cookTime || '15 min'}<br />
                  ⏳ Total : {recipe.totalTime || '25 min'}
                </p>
                <p className="recipe-description">{recipe.description}</p>

                <div className="recipe-actions" onClick={e => e.stopPropagation()}>
                  <img src={likeIcon} alt="Like" onClick={() => handleLike(recipe._id)} style={{ cursor: 'pointer' }} />
                
                  <img src={commentIcon} alt="Comment" onClick={() => toggleCommentSection(recipe._id)} style={{ cursor: 'pointer' }} />
                  <img src={shareIcon} alt="Share" />
                </div>

                {showComment === recipe._id && (
                  <div className="comment-section show">
                    <input
                      type="text"
                      value={commentInput[recipe._id] || ''}
                      onChange={(e) => handleCommentInputChange(recipe._id, e.target.value)}
                      placeholder="Écrivez un commentaire..."
                    />
                    <button onClick={() => submitComment(recipe._id)}>Envoyer</button>

                    <div className="comments-display">
                      {comments[recipe._id]?.length > 0 ? (
                        comments[recipe._id].map((c) => (
                          <div key={c._id || Math.random()} className="single-comment">
                            <strong>{c.name || 'Anonyme'}</strong> ({c.rating}⭐) : {c.text}
                          </div>
                        ))
                      ) : (
                        <p>Aucun commentaire encore.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">Aucune recette comfort food trouvée.</p>
        )}
      </div>
    </div>
  );
};

export default Feculentproduct;
