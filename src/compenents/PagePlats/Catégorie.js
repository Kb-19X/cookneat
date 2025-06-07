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

  // 🔍 Filtrage en fonction de la recherche
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="plats-body-container">
      {/* 🔍 Barre de recherche */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher une recette..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🧑‍🍳 Liste des recettes */}
      <div className="recipes-list">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div key={recipe._id} className="recipe-card">
              <div className="recipe-image">
                <img src={recipe.imageUrl} alt={recipe.title} />
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
          ))
        ) : (
          <p className="no-results">Aucune recette trouvée.</p>
        )}
      </div>
    </div>
  );
};

export default Catégorie;
