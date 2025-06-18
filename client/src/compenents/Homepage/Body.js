import React, { useEffect, useState } from 'react';
import axios from 'axios';
import commentIcon from '../../assets/ImagePlatsPage/comment.png';
import likeIcon from '../../assets/ImagePlatsPage/like.png';
import shareIcon from '../../assets/ImagePlatsPage/share.png';
import './Body.css';
import API_URL from '../config';

fetch(`${API_URL}/recipes`)

const Body = () => {
  const [recipes, setRecipes] = useState([]);
  const [comments, setComments] = useState({});
  const [showComment, setShowComment] = useState(null);
  const [newComment, setNewComment] = useState({ recipeId: '', name: '', text: '', rating: 1 });
  const [allComments, setAllComments] = useState([]);

  // Base URL API centralisée
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/comments`);
        setAllComments(res.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des commentaires :', err);
      }
    };
    fetchComments();
  }, [API_URL]);

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
  }, [API_URL]);

  const featuredTitles = ["Pad Thaï", "Shawarma de poulet", "Poulet yassa", "Choucroute garnie"];
  const featuredRecipes = recipes.filter((r) => featuredTitles.includes(r.title));

  const handleCommentChange = (field, value) => {
    if (["recipeId", "name", "text", "rating"].includes(field)) {
      setNewComment((prev) => ({ ...prev, [field]: value }));
    } else {
      setComments((prev) => ({ ...prev, [field]: value }));
    }
  };

  const submitComment = (id) => {
    if (typeof id === 'string') {
      if (!comments[id] || comments[id].trim() === '') {
        alert('Le commentaire ne peut pas être vide.');
        return;
      }
      console.log(`Commentaire pour la recette ${id} : ${comments[id]}`);
      setComments((prev) => ({ ...prev, [id]: '' }));
      // Ici, tu peux faire un POST axios pour enregistrer le commentaire côté serveur
    } else {
      const { recipeId, name, text, rating } = newComment;
      if (!recipeId || !name || !text || !rating) {
        alert('Veuillez remplir tous les champs.');
        return;
      }
      console.log('Commentaire global envoyé :', newComment);
      setNewComment({ recipeId: '', name: '', text: '', rating: 1 });
      // Ici aussi, tu peux faire un POST axios pour envoyer le commentaire
    }
  };

  const toggleCommentSection = (id) => {
    setShowComment((prev) => (prev === id ? null : id));
  };

  return (
    <div className="plats-body-container">
      <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '30px' }}>
        🍽️ Nos plats populaires
      </h2>

      <div className="recipes-list">
        {featuredRecipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <div className="recipe-image">
              <img
                src={
                  recipe.imageUrl.startsWith('http')
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

      <div className="comment-section-global">
        <h2 className='plats-commentez'>Commentez un plat !</h2>
        <select onChange={(e) => handleCommentChange('recipeId', e.target.value)} value={newComment.recipeId}>
          <option value="">Sélectionnez un plat</option>
          {recipes.map((recipe) => (
            <option key={recipe._id} value={recipe._id}>{recipe.title}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Votre nom"
          value={newComment.name}
          onChange={(e) => handleCommentChange('name', e.target.value)}
        />
        <textarea
          placeholder="Votre commentaire"
          value={newComment.text}
          onChange={(e) => handleCommentChange('text', e.target.value)}
        />
        <select value={newComment.rating} onChange={(e) => handleCommentChange('rating', parseInt(e.target.value))}>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n} étoile{n > 1 ? 's' : ''}</option>
          ))}
        </select>
        <button onClick={() => submitComment()}>
          Envoyer
        </button>
      </div>

      <div className="all-comments-section">
        <h2 className="plats-commentez">🗣️ Derniers commentaires</h2>
        {allComments.length > 0 ? (
          allComments.slice(0, 10).map((comment) => (
            <div key={comment._id} className="comment-card">
              <p>
                <strong>{comment.name}</strong> sur <em>{recipes.find(r => r._id === comment.recipeId)?.title || 'Recette inconnue'}</em> :
              </p>
              <p>{comment.text}</p>
              <p>⭐ {comment.rating} / 5</p>
            </div>
          ))
        ) : (
          <p>Aucun commentaire pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default Body;
