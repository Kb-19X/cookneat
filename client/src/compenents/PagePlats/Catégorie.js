import './Catégorie.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import commentIcon from '../../assets/ImagePlatsPage/comment.png';
import likeIcon from '../../assets/ImagePlatsPage/like.png';
import shareIcon from '../../assets/ImagePlatsPage/share.png';

const API_URL = process.env.REACT_APP_API_URL;

const Catégorie = () => {
  const [recipes, setRecipes] = useState([]);
  const [comments, setComments] = useState({});
  const [showComment, setShowComment] = useState(null);
  const [commentInput, setCommentInput] = useState({});
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/recipes`);
        setRecipes(res.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des recettes :', err);
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
        rating: 5 // Tu peux adapter la notation plus tard
      };

      await axios.post(`${API_URL}/api/comments`, newComment, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setCommentInput((prev) => ({ ...prev, [recipeId]: '' }));
      fetchRecipeComments(recipeId);
    } catch (err) {
      console.error("Erreur lors de l'envoi du commentaire :", err.response?.data || err.message);
      alert("Erreur lors de l'envoi du commentaire : " + (err.response?.data?.error || err.message));
    }
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="plats-body-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher une recette..."
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
                    recipe.imageUrl && recipe.imageUrl.startsWith('http')
                      ? recipe.imageUrl
                      : recipe.imageUrl
                        ? `${API_URL}${recipe.imageUrl}`
                        : 'https://via.placeholder.com/300x200?text=Pas+d\'image'
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
                {recipe.description && (
                  <p className="recipe-description">{recipe.description}</p>
                )}

                <div className="recipe-actions">
                  <img src={likeIcon} alt="Like" />
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
                    <button onClick={() => submitComment(recipe._id)}>
                      Envoyer
                    </button>

                    <div className="comments-display">
                      {comments[recipe._id]?.length > 0 ? (
                        comments[recipe._id].map((c) => (
                          <div key={c._id || c.id || Math.random()} className="single-comment">
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

export default Catégorie;
