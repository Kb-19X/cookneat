import '../PatesNouilllesPage/Feculentproduct.css'; 
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import commentIcon from '../../assets/ImagePlatsPage/comment.png';
import likeIcon from '../../assets/ImagePlatsPage/like.png';
import shareIcon from '../../assets/ImagePlatsPage/share.png';
import chef from '../../assets/ImageHomePage/chef.jpeg';

const API_URL = process.env.REACT_APP_API_URL || 'https://cookneat-server.onrender.com';

const ChefRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [showComment, setShowComment] = useState(null);
  const [commentInput, setCommentInput] = useState({});
  const [search, setSearch] = useState('');
  const [showChefOnly, setShowChefOnly] = useState(true); // <-- toggle pour recettes chef / toutes

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/recipes`);
        console.log('Recettes reçues:', res.data);
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
    if (!text) {
      alert("Le commentaire ne peut pas être vide.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Vous devez être connecté pour commenter.");
        return;
      }

      const newComment = {
        recipeId,
        text,
        rating: 5,
      };

      await axios.post(`${API_URL}/api/comments`, newComment, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
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
      if (!token) {
        alert("Vous devez être connecté pour liker.");
        return;
      }

      const res = await axios.post(
        `${API_URL}/api/recipes/${recipeId}/like`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setLikes(prev => ({ ...prev, [recipeId]: res.data.likes }));
    } catch (err) {
      console.error("Erreur lors du like :", err.response?.data || err.message);
      alert("Erreur lors du like : " + (err.response?.data?.message || err.message));
    }
  };

  // Appliquer le filtre showChefOnly avant la recherche textuelle
  const displayedRecipes = (showChefOnly
    ? recipes.filter(recipe => recipe.isChefRecipe === true)
    : recipes
  ).filter(recipe =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="plats-body-container">
      <div className='background-cover'>
        <div className="banner-container">
          <div className="banner-left">
            <img src={chef} alt="plats du chef" />
            <div className="banner-overlay-heal">
              <h1>Recettes</h1>
              <p><strong>Inspirées</strong> par la tradition, <em>réinventées</em> avec passion.</p>
            </div>
          </div>
          <div className="banner-right">
            <h2>Découvrez l’univers culinaire en recettes.</h2>
            <p>
              "Des plats raffinés, créatifs et inspirés, imaginés pour éveiller vos papilles et sublimer votre quotidien."
            </p>
          </div>
        </div>
      </div>

      <div className="rapide-header-section">
        <div className="rapide-text">
          <h1>👨‍🍳 Recettes {showChefOnly ? "du Chef" : "Toutes"} 👨‍🍳</h1>
          <p>
            Une sélection unique de recettes pensées pour vous impressionner, inspirées de la grande cuisine et faciles à refaire chez vous.
          </p>
          <div className="rapide-benefits">
            <div className="benefit-box">🥇 Savoir-faire authentique</div>
            <div className="benefit-box">🍽️ Élégantes et savoureuses</div>
            <div className="benefit-box">🧑‍🍳 Conseillées par nos chefs</div>
          </div>

          <button
            onClick={() => setShowChefOnly(!showChefOnly)}
            style={{ marginTop: '15px', padding: '8px 16px', cursor: 'pointer' }}
          >
            {showChefOnly ? 'Voir toutes les recettes' : 'Voir uniquement les recettes du chef'}
          </button>
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

      <div className="recipes-list">
        {displayedRecipes.length > 0 ? (
          displayedRecipes.map((recipe) => (
            <div key={recipe._id} className="recipe-card">
              <div className="recipe-image" style={{ width: '200px', height: '150px', overflow: 'hidden' }}>
                <img
                  src={
                    recipe.imageUrl && recipe.imageUrl.startsWith('http')
                      ? recipe.imageUrl
                      : recipe.imageUrl
                      ? `${API_URL}${recipe.imageUrl}`
                      : '/fallback.jpg'
                  }
                  alt={recipe.title || 'Recette'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
                  <img
                    src={likeIcon}
                    alt="Like"
                    onClick={() => handleLike(recipe._id)}
                    style={{ cursor: 'pointer' }}
                  />
                  <span>{likes[recipe._id] || 0}</span>

                  <img
                    src={commentIcon}
                    alt="Comment"
                    onClick={() => toggleCommentSection(recipe._id)}
                    style={{ cursor: 'pointer' }}
                  />

                  <img src={shareIcon} alt="Share" style={{ cursor: 'pointer' }} />
                </div>

                {showComment === recipe._id && (
                  <div className="comment-section show">
                    <input
                      type="text"
                      value={commentInput[recipe._id] || ''}
                      onChange={(e) =>
                        handleCommentInputChange(recipe._id, e.target.value)
                      }
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
                        <p>Aucun commentaire encore.</p>
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
    </div>
  );
};

export default ChefRecipe;
