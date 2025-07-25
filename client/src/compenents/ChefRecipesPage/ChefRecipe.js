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

useEffect(() => {
  const fetchRecipes = async () => {
    try {
      const res = await axios.get(`${API_URL}/recipes`);
      // Filtrer uniquement les recettes du chef
      const chefRecipes = res.data.filter(recipe => recipe.isChefRecipe === true);
      setRecipes(chefRecipes);
    } catch (error) {
      console.error('Erreur lors du chargement des recettes:', error);
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

  // Affiche uniquement les recettes du chef
  const filteredRecipes = recipes
    .filter((r) => r.isChefRecipe === true) // ← Assure-toi d'avoir cette propriété dans ta base
    .filter((recipe) =>
      recipe.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="plats-body-container">
      <div className='background-cover'>
        <div className="banner-container">
          <div className="banner-left">
            <img src={chef} alt="plats du chef" />
            <div className="banner-overlay-heal">
              <h1>Recettes du Chef</h1>
              <p><strong>Inspirées</strong> par la tradition, <em>réinventées</em> avec passion.</p>
            </div>
          </div>
          <div className="banner-right">
            <h2>Découvrez l’univers du chef en recettes. </h2>
            <p>
           <p>"Des plats raffinés, créatifs et inspirés, imaginés par nos chefs pour éveiller vos papilles et sublimer votre quotidien."</p>
            </p>
          </div>
        </div>
      </div>

      <div className="rapide-header-section">
        <div className="rapide-text">
          <h1>👨‍🍳 Les Recettes du Chef 👨‍🍳</h1>
          <p>
            Une sélection unique de recettes pensées pour vous impressionner, inspirées de la grande cuisine et faciles à refaire chez vous.
          </p>
          <div className="rapide-benefits">
            <div className="benefit-box">🥇 Savoir-faire authentique</div>
            <div className="benefit-box">🍽️ Élégantes et savoureuses</div>
            <div className="benefit-box">🧑‍🍳 Conseillées par le chef</div>
          </div>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher une recette du chef..."
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
                  />
                  <span>{likes[recipe._id] || 0}</span>
                  <img
                    src={commentIcon}
                    alt="Comment"
                    onClick={() => toggleCommentSection(recipe._id)}
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
          <p className="no-results">Aucune recette du chef trouvée.</p>
        )}
      </div>
    </div>
  );
};

export default ChefRecipe;
