import './Catégorie.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import commentIcon from '../../assets/ImagePlatsPage/comment.png';
import likeIcon from '../../assets/ImagePlatsPage/like.png';
import shareIcon from '../../assets/ImagePlatsPage/share.png';

const Catégorie = () => {
  const [recipes, setRecipes] = useState([]);
  const [comments, setComments] = useState({});
  const [showComment, setShowComment] = useState(null);
  const [commentInput, setCommentInput] = useState({});
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/recipes');
        setRecipes(res.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des recettes :', err);
      }
    };
    fetchRecipes();
  }, []);

  const fetchRecipeComments = async (recipeId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/comments?recipeId=${recipeId}`);
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
        rating: 5
      };

      await axios.post("http://localhost:5000/api/comments", newComment, {
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
                    recipe.imageUrl.startsWith('http')
                      ? recipe.imageUrl
                      : `http://localhost:5000${recipe.imageUrl}`
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
                        comments[recipe._id].map((c, index) => (
                          <div key={index} className="single-comment">
                            <strong>{c.name}</strong> ({c.rating}⭐) : {c.text}
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
