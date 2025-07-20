import React, { useState, useEffect } from 'react';
import './ProteineBody.css';
import { useNavigate } from 'react-router-dom';

import commentIcon from '../../assets/ImagePlatsPage/comment.png';
import likeIcon from '../../assets/ImagePlatsPage/like.png';
import shareIcon from '../../assets/ImagePlatsPage/share.png';
import proteineBanner from '../../assets/ImageHomePage/proteines.jpg'; // image adaptée

const API_URL = process.env.REACT_APP_API_URL || 'https://cookneat-server.onrender.com';

const ProteineBody = () => {
  const [recipes, setRecipes] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [showComment, setShowComment] = useState(null);
  const [commentInput, setCommentInput] = useState({});
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProteineRecipes = async () => {
      try {
        const res = await fetch(`${API_URL}/api/recipes?category=proteine`);
        const data = await res.json();
        setRecipes(data); // ✅ chargement uniquement des recettes protéines
      } catch (error) {
        console.error('❌ Erreur chargement recettes protéines :', error);
      }
    };

    fetchProteineRecipes();
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
            <img src={proteineBanner} alt="Recettes protéinées" />
            <div className="banner-overlay-heal">
              <h1>Protéines</h1>
              <p>Des recettes riches en protéines pour l'énergie et la masse musculaire.</p>
            </div>
          </div>
          <div className="banner-right">
            <h2>Des repas boostés en protéines, bons pour les muscles et le moral !</h2>
            <p>
              Que ce soit pour la muscu, l'endurance ou une meilleure satiété, ces plats riches en protéines vous aideront à atteindre vos objectifs !
            </p>
          </div>
        </div>
      </div>

      <div className="rapide-header-section">
        <div className="rapide-text">
          <h1>🍗 Recettes Protéinées 🍳</h1>
          <p>Pour la prise de masse, l'énergie et une alimentation équilibrée.</p>
          <div className="rapide-benefits">
            <div className="benefit-box">💪 Prise de muscle</div>
            <div className="benefit-box">🥩 Ingrédients riches en protéines</div>
            <div className="benefit-box">🍽️ Satiété longue durée</div>
          </div>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher une recette protéinée..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="recipes-list">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div
              key={recipe._id}
              className="recipe-card"
              onClick={() => navigate(`/recette/${recipe._id}`)}
            >
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

                <div className="recipe-actions" onClick={(e) => e.stopPropagation()}>
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
          <p className="no-results">Aucune recette trouvée.</p>
        )}
      </div>
    </div>
  );
};

export default ProteineBody;
