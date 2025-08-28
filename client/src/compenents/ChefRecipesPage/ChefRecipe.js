import '../PatesNouilllesPage/Feculentproduct.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import commentIcon from '../../assets/ImagePlatsPage/comment.png';
import likeIcon from '../../assets/ImagePlatsPage/like.png';
import shareIcon from '../../assets/ImagePlatsPage/share.png';
import chef from '../../assets/ImageHomePage/chef.jpeg';

const Filters = ({ onFilterChange }) => {
  const [category, setCategory] = useState('');
  const [time, setTime] = useState('');
  const [chefOnly, setChefOnly] = useState(false);
  const [ingredient, setIngredient] = useState('');

  const handleChange = () => {
    onFilterChange({ category, time, chefOnly, ingredient });
  };

  return (
    <div className="filters-container">
      <div className="filter-group">
        <label>Catégorie :</label>
        <select value={category} onChange={(e) => { setCategory(e.target.value); handleChange(); }}>
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
          className='filter-ingredient'
          type="text"
          placeholder="Ex: poulet"
          value={ingredient}
          onChange={(e) => { setIngredient(e.target.value); handleChange(); }}
        />
      </div>
    </div>
  );
};

const API_URL = process.env.REACT_APP_API_URL || 'https://cookneat-server.onrender.com';

const ChefRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [showComment, setShowComment] = useState(null);
  const [commentInput, setCommentInput] = useState({});
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ category: '', time: '', chefOnly: false, ingredient: '' });

 
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 12; 

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/recipes`);
        setRecipes(res.data);

        const initialLikes = {};
        res.data.forEach(r => {
          initialLikes[r._id] = r.likes || 0;
        });
        setLikes(initialLikes);
      } catch (error) {
        console.error('Erreur lors de la récupération des recettes :', error);
      }
    };
    fetchRecipes();
  }, []);

  const fetchRecipeComments = async (recipeId) => {
    try {
      const res = await axios.get(`${API_URL}/api/comments?recipeId=${recipeId}`);
      setComments(prev => ({ ...prev, [recipeId]: res.data }));
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
    setCommentInput(prev => ({ ...prev, [id]: value }));
  };

  const submitComment = async (recipeId) => {
    const text = commentInput[recipeId]?.trim();
    if (!text) return alert("Le commentaire ne peut pas être vide.");

    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Vous devez être connecté pour commenter.");

      const newComment = { recipeId, text, rating: 5 };
      await axios.post(`${API_URL}/api/comments`, newComment, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });

      setCommentInput(prev => ({ ...prev, [recipeId]: '' }));
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

      setLikes(prev => ({ ...prev, [recipeId]: res.data.likes }));
    } catch (err) {
      console.error("Erreur lors du like :", err.response?.data || err.message);
      alert("Erreur lors du like : " + (err.response?.data?.message || err.message));
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); 
  };

  
  const filteredRecipes = recipes
    .filter(r => r.title.toLowerCase().includes(search.toLowerCase()))
    .filter(r => !filters.category || r.category.toLowerCase() === filters.category.toLowerCase())
    .filter(r => {
      if (!filters.time) return true;
      const totalTime = parseInt(r.totalTime) || 0;
      if (filters.time === "15") return totalTime <= 15;
      if (filters.time === "30") return totalTime > 15 && totalTime <= 30;
      if (filters.time === "60") return totalTime > 30;
      return true;
    })
    .filter(r => !filters.chefOnly || r.isChefRecipe === true)
    .filter(r => !filters.ingredient || r.ingredients.some(i => i.name.toLowerCase().includes(filters.ingredient.toLowerCase())));

  
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="plats-body-container">
   
      <div className='background-cover'>
        <div className="banner-container">
          <div className="banner-left">
            <img src={chef} alt="Image illustrative de recettes" />
            <div className="banner-overlay-heal">
              <h1>Toutes les Recettes</h1>
              <p><strong>Une collection</strong> riche et variée, <em>pour tous les goûts.</em></p>
            </div>
          </div>
          <div className="banner-right">
            <h2>Explorez l’univers culinaire à travers nos recettes.</h2>
            <p>"Des plats pour tous les jours ou des moments d’exception, conçus pour ravir vos papilles."</p>
          </div>
        </div>
      </div>

 
      <div className="rapide-header-section">
        <div className="rapide-text">
          <h1>Découvrez toutes nos recettes</h1>
          <p>Un éventail de recettes simples, gourmandes et inspirantes, adaptées à tous les niveaux.</p>
          <div className="rapide-benefits">
            <div className="benefit-box">🥇 Authenticité garantie</div>
            <div className="benefit-box">🍽️ Saveurs et créativité</div>
            <div className="benefit-box">🧑‍🍳 Sélectionnées par nos experts culinaires</div>
          </div>
        </div>
      </div>

     
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher une recette..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      
      <Filters onFilterChange={handleFilterChange} />

     
      <div className="recipes-list">
        {currentRecipes.length > 0 ? (
          currentRecipes.map((recipe) => (
            <div key={recipe._id} className="recipe-card">
              <div className="recipe-image">
                <img
                  src={recipe.imageUrl?.startsWith('http') ? recipe.imageUrl : recipe.imageUrl ? `${API_URL}${recipe.imageUrl}` : '/fallback.jpg'}
                  alt={recipe.title || 'Recette'}
                  onError={(e) => { e.target.onerror = null; e.target.src = '/fallback.jpg'; }}
                />
              </div>

              <div className="recipe-info">
                <h3>{recipe.title}</h3>
                <p className="recipe-time">
                  ⏱️ Préparation : {recipe.prepTime || '10 min'} <br />
                  🔥 Cuisson : {recipe.cookTime || '15 min'} <br />
                  ⏳ Total : {recipe.totalTime || '25 min'}
                </p>
                {recipe.description && <p className="recipe-description">{recipe.description}</p>}

                <div className="recipe-actions">
                  <img src={likeIcon} alt="Like" onClick={() => handleLike(recipe._id)} style={{ cursor: 'pointer' }} />
                  <img src={commentIcon} alt="Commentaire" onClick={() => toggleCommentSection(recipe._id)} style={{ cursor: 'pointer' }} />
                  <img src={shareIcon} alt="Partager" style={{ cursor: 'pointer' }} />
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
                          <div key={c._id} className="single-comment">
                            <strong>{c.name || 'Anonyme'}</strong> ({c.rating}⭐) : {c.text}
                          </div>
                        ))
                      ) : (
                        <p>Aucun commentaire pour le moment.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">Aucune recette trouvée.</p>
        )}
      </div>

     
      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}>Précédent</button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => goToPage(index + 1)}
              className={currentPage === index + 1 ? 'active-page' : ''}
            >
              {index + 1}
            </button>
          ))}
          <button disabled={currentPage === totalPages} onClick={() => goToPage(currentPage + 1)}>Suivant</button>
        </div>
      )}
    </div>
  );
};

export default ChefRecipes;
