import React, { useState, useEffect } from 'react';
import './Detoxcover.css';

import commentIcon from '../../assets/ImagePlatsPage/comment.png';
import likeIcon from '../../assets/ImagePlatsPage/like.png';
import shareIcon from '../../assets/ImagePlatsPage/share.png';
import detoxBanner from '../../assets/ImageDetoxPage/smoothie.jpg'; // à adapter si tu veux une autre image

const API_URL = process.env.REACT_APP_API_URL || 'https://cookneat-server.onrender.com';

const Detoxcover = () => {
  const [recipes, setRecipes] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [showComment, setShowComment] = useState(null);
  const [commentInput, setCommentInput] = useState({});
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchDetoxRecipes = async () => {
      try {
        const res = await fetch(`${API_URL}/api/recipes?category=detox`);
        const data = await res.json();
        setRecipes(data);
      } catch (error) {
        console.error('❌ Erreur chargement recettes détox :', error);
      }
    };

    fetchDetoxRecipes();
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
            <img src={detoxBanner} alt="Recettes détox" />
            <div className="banner-overlay-heal">
              <h1>Détox</h1>
              <p>Des recettes saines pour purifier naturellement votre corps.</p>
            </div>
          </div>
          <div className="banner-right">
            <h2>Purifiez votre organisme avec des recettes simples et naturelles</h2>
            <p>
              Soupes, smoothies, infusions… découvrez une sélection de plats détox riches en nutriments,
              légers pour la digestion et parfaits pour faire le plein d’énergie.
            </p>
          </div>
        </div>
      </div>

      <div className="rapide-header-section">
        <div className="rapide-text">
          <h1>🌿 Recettes Détox 🌿</h1>
          <p>
            Pour alléger votre organisme, renforcer vos défenses et retrouver de la vitalité.
          </p>
          <div className="rapide-benefits">
            <div className="benefit-box">🧘 Bien-être digestif</div>
            <div className="benefit-box">🍵 Ingrédients naturels</div>
            <div className="benefit-box">💧 Drainage doux</div>
          </div>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher une recette détox..."
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
                {recipe.description && (
                  <p className="recipe-description">{recipe.description}</p>
                )}

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
          <p className="no-results">Aucune recette détox trouvée.</p>
        )}
      </div>
    </div>
  );
};

export default Detoxcover;
