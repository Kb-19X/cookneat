import '../PatesNouilllesPage/Feculentproduct.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import commentIcon from '../../assets/ImagePlatsPage/comment.png';
import likeIcon from '../../assets/ImagePlatsPage/like.png';
import shareIcon from '../../assets/ImagePlatsPage/share.png';
import burger from '../../assets/ImageHomePage/burger.jpg';
const API_URL = process.env.REACT_APP_API_URL || 'https://cookneat-server.onrender.com';

const Viandes = () => {
  const [recipes, setRecipes] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [showComment, setShowComment] = useState(null);
  const [commentInput, setCommentInput] = useState({});
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/recipes`);
        console.log("Toutes les recettes reçues :", res.data);
        setRecipes(res.data);
        const initialLikes = {};
        res.data.forEach((r) => {
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

      setLikes((prev) => ({ ...prev, [recipeId]: res.data.likes }));
    } catch (err) {
      console.error("Erreur lors du like :", err.response?.data || err.message);
      alert("Erreur lors du like : " + (err.response?.data?.message || err.message));
    }
  };

  // Filtrage des recettes Rapides & Faciles
  const rapideFacile = recipes.filter((r) => {
    const totalTime = parseInt(r.totalTime) || 0;
    return totalTime <= 20 && (r.difficulty === 'facile' || !r.difficulty);
  });

  const filteredRecipes = rapideFacile.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="plats-body-container">
      <div className='background-cover'>
   <div className="banner-container">
  <div className="banner-left">
    <img src={burger} alt="fruits et légumes" />
    <div className="banner-overlay-heal">
      <h1>Rapide & Facile</h1>
      <p><strong>Des recettes</strong> <em>express</em>, <strong>sans stress.</strong></p>
    </div>
  </div>
  <div className="banner-right">
    <h2> Découvrez notre sélection de plats 100% simples et rapides !</h2>
    <p>
     Des saveurs venues d’ailleurs pour éveiller vos sens : <span className='mot-color'>embarquez</span> pour un tour du monde culinaire sans quitter votre cuisine.
    </p>
  </div>

</div>


    </div>
<div className="rapide-header-section">
  <div className="rapide-text">
    <h1>🥗 Recettes Rapides & Faciles</h1>
    <p>
      Moins de 20 minutes, zéro stress, 100% goût.  
      Ces plats sont parfaits pour les étudiants pressés, les familles débordées ou les gourmands impatients.
    </p>
    <div className="rapide-benefits">
      <div className="benefit-box">⏱️ Prêtes en 20 min</div>
      <div className="benefit-box">👨‍🍳 Simples à réaliser</div>
      <div className="benefit-box">💡 Ingrédients faciles à trouver</div>
    </div>
  </div>
</div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher un plat..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="recipes-list">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div key={recipe._id} className="recipe-card">
              <div className="recipe-image">
                <img
                  src={
                    recipe.imageUrl?.startsWith('http')
                      ? recipe.imageUrl
                      : `${API_URL}${recipe.imageUrl}`
                  }
                  alt={recipe.title}
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
                  <img src={shareIcon} alt="Share" />
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
          <p className="no-results">Aucun plat trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default Viandes;
