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

  const handleCommentChange = (id, value) => {
    setComments((prev) => ({ ...prev, [id]: value }));
  };

  const submitComment = (id) => {
    if (!comments[id] || comments[id].trim() === '') {
      alert('Le commentaire ne peut pas être vide.');
      return;
    }
    console.log(`Commentaire pour la recette ${id} : ${comments[id]}`);
    setComments((prev) => ({ ...prev, [id]: '' }));
  };

  const toggleCommentSection = (id) => {
    setShowComment((prev) => (prev === id ? null : id));
  };

  return (
    <div className="plats-body-container">
      <div className="recipes-list">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <div className="recipe-image">
              <img
                src={
                  recipe.imageUrl?.startsWith('http')
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
                    value={comments[recipe._id] || ''}
                    onChange={(e) =>
                      handleCommentChange(recipe._id, e.target.value)
                    }
                    placeholder="Écrivez un commentaire..."
                  />
                  <button onClick={() => submitComment(recipe._id)}>
                    Envoyer
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catégorie;
