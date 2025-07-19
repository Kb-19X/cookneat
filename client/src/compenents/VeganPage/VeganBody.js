import React, { useState, useEffect } from 'react';
import './VeganBody.css';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import veganBanner from '../../assets/ImageHomePage/vegan_banner.jpg'; 
import commentIcon from '../../assets/ImagePlatsPage/comment.png';
import likeIcon from '../../assets/ImagePlatsPage/like.png';
import shareIcon from '../../assets/ImagePlatsPage/share.png';

const API_URL = 'http://localhost:5000';

const VeganBody = () => {
  const [recipes, setRecipes] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [showComment, setShowComment] = useState(null);
  const [commentInput, setCommentInput] = useState({});
  const [search, setSearch] = useState('');

  useEffect(() => {
    // fetch(`${API_URL}/api/recipes?category=vegan`)
    //   .then(res => res.json())
    //   .then(data => setRecipes(data));
  }, []);

  const handleLike = (id) => {
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const toggleCommentSection = (id) => {
    setShowComment(prev => (prev === id ? null : id));
  };

  const handleCommentInputChange = (id, value) => {
    setCommentInput(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const submitComment = (id) => {
    const text = commentInput[id];
    if (!text) return;

    const newComment = {
      _id: Math.random().toString(36).substring(7),
      name: 'Utilisateur',
      rating: 5,
      text
    };

    setComments(prev => ({
      ...prev,
      [id]: [...(prev[id] || []), newComment]
    }));

    setCommentInput(prev => ({ ...prev, [id]: '' }));
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="plats-body-container">
      <div className='background-cover'>
        <div className="banner-container">
          <div className="banner-left">
            <img src={veganBanner} alt="fruits et légumes vegan" />
            <div className="banner-overlay-heal">
              <h1>Vegan</h1>
              <p>Des recettes 100% végétales, éthiques et savoureuses.</p>
            </div>
          </div>
          <div className="banner-right">
            <h2>Explorez une cuisine vegan pleine de couleurs et de bienfaits !</h2>
            <p>
              Plats délicieux sans aucun produit d'origine animale, pour votre bien-être, celui des animaux et de la planète.
            </p>
          </div>
        </div>
      </div>

      <div className="rapide-header-section">
        <div className="rapide-text">
          <h1>🌱 Recettes Vegan 🌱</h1>
          <p>
            Simples, rapides, gourmandes... Découvrez l’univers végétal sans compromis sur le goût.
          </p>
          <div className="rapide-benefits">
            <div className="benefit-box">🌿 Sans produits animaux</div>
            <div className="benefit-box">🥑 Pleines de nutriments</div>
            <div className="benefit-box">🌍 Bon pour la planète</div>
          </div>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher une recette vegan..."
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
                  ⏱️ Préparation : {recipe.prepTime || '10 min'}<br />
                  🔥 Cuisson : {recipe.cookTime || '15 min'}<br />
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
          <p className="no-results">Aucune recette vegan trouvée.</p>
        )}
      </div>
    </div>
  );
};

export default VeganBody;
