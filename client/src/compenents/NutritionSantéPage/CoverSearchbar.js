import React, { useState, useEffect } from 'react';
import './CoverSearchbar.css';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import sante from '../../assets/ImageHomePage/sante.jpg';
import commentIcon from '../../assets/ImagePlatsPage/comment.png';
import likeIcon from '../../assets/ImagePlatsPage/like.png';
import shareIcon from '../../assets/ImagePlatsPage/share.png';

const API_URL = process.env.REACT_APP_API_URL || 'https://cookneat-server.onrender.com';

const CoverSearchbar = () => {
  const [recipes, setRecipes] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [showComment, setShowComment] = useState(null);
  const [commentInput, setCommentInput] = useState({});
  const [search, setSearch] = useState('');

  // 🔁 Fetch réel des recettes healthy
  useEffect(() => {
    fetch(`${API_URL}/api/recipes/healthy`)
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error('❌ Erreur de chargement des recettes :', err));
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false
  };

  return (
    <div className="plats-body-container">
      <div className='background-cover'>
        <div className="banner-container">
          <div className="banner-left">
            <img src={sante} alt="fruits et légumes" />
            <div className="banner-overlay-heal">
              <h1> Healthy</h1>
              <p>Des plats sains, équilibrés et pleins de saveurs.</p>
            </div>
          </div>
          <div className="banner-right">
            <h2>Des plats healthy, faciles à préparer et bons pour votre santé !</h2>
            <p>
              "Explorez des recettes healthy inspirées du monde entier : un tour du monde savoureux et bon pour votre santé, depuis votre cuisine."
            </p>
          </div>
        </div>
      </div>

      <div className="rapide-header-section">
        <div className="rapide-text">
          <h1>🥗 Recettes Healthy 🥗</h1>
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
          <p className="no-results">Aucun plat trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default CoverSearchbar;
