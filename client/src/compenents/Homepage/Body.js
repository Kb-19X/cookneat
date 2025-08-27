import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import commentIcon from '../../assets/ImagePlatsPage/comment.png';
import likeIcon from '../../assets/ImagePlatsPage/like.png';
import shareIcon from '../../assets/ImagePlatsPage/share.png';
import './Body.css';

const Body = () => {
  const [recipes, setRecipes] = useState([]);
  const [showComment, setShowComment] = useState(null);
  const [newComment, setNewComment] = useState({ recipeId: '', text: '', rating: 1 });
  const [allComments, setAllComments] = useState([]);
  const [commentSent, setCommentSent] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL || 'https://cookneat-server.onrender.com';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error('Erreur de décodage du token :', err);
      }
    }
  }, []);

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
  const latestRecipes = [...recipes].slice(-6).reverse();
  const suggestedRecipes = [...recipes].sort(() => 0.5 - Math.random()).slice(0, 3);

  const handleCommentChange = (field, value) => {
    setNewComment((prev) => ({ ...prev, [field]: value }));
  };

  const submitComment = async () => {
    const { recipeId, text, rating } = newComment;
    if (!recipeId || !text || !rating || !user?.name) {
      alert('Veuillez remplir tous les champs et être connecté.');
      return;
    }
    const commentToSend = { ...newComment, name: user.name };
    try {
      await axios.post(`${API_URL}/api/comments`, commentToSend);
      setAllComments((prev) => [{ ...commentToSend }, ...prev]);
      setCommentSent(true);
      setTimeout(() => setCommentSent(false), 3000);
      setNewComment({ recipeId: '', text: '', rating: 1 });
    } catch (error) {
      console.error("Erreur lors de l'envoi du commentaire :", error);
    }
  };

  const toggleCommentSection = (id) => {
    setShowComment((prev) => (prev === id ? null : id));
    setNewComment({ recipeId: id, text: '', rating: 1 });
  };

  const renderRecipeCard = (recipe) => (
    <div key={recipe._id} className="recipe-card">
      {/* Image cliquable */}
      <div
        className="recipe-image"
        onClick={() => navigate(`/productpage/${recipe._id}`)}
        style={{ cursor: 'pointer' }}
      >
        <img
          src={recipe.imageUrl.startsWith('http') ? recipe.imageUrl : `${API_URL}${recipe.imageUrl}`}
          alt={recipe.title}
        />
      </div>
      <div className="recipe-info">
        {/* Titre non cliquable */}
        <h3>{recipe.title}</h3>
        <p className="recipe-time">
          ⏱️ Préparation : {recipe.prepTime || '10 min'} <br />
          🔥 Cuisson : {recipe.cookTime || '15 min'} <br />
          ⏳ Total : {recipe.totalTime || '25 min'}
        </p>
        {recipe.description && <p className="recipe-description">{recipe.description}</p>}

        <div className="recipe-actions">
          <img src={likeIcon} alt="Like" />
          <img src={commentIcon} alt="Comment" onClick={() => toggleCommentSection(recipe._id)} />
          <img src={shareIcon} alt="Share" />
        </div>

        {showComment === recipe._id && (
          <div className="commentaire-box">
            <div className="commentaire-user">
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || "User"}`}
                alt="avatar"
              />
              <p className="connected-name">
                Connecté en tant que : <strong>{user?.name || 'Utilisateur'}</strong>
              </p>
            </div>

            <textarea
              rows="3"
              placeholder="Donnez votre avis sur cette recette..."
              value={newComment.text}
              onChange={(e) => handleCommentChange("text", e.target.value)}
            ></textarea>

            <select
              value={newComment.rating}
              onChange={(e) => handleCommentChange("rating", e.target.value)}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n} ⭐</option>
              ))}
            </select>

            <button className="btn-submit-comment" onClick={submitComment}>
              ✅ Envoyer le commentaire
            </button>

            {commentSent && (
              <p style={{ color: 'green', fontWeight: 'bold' }}>
                ✅ Commentaire envoyé avec succès !
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="plats-body-container">


      <h2 className='plats-populaires'> Dernières recettes</h2>
      <div className="recipes-list">{latestRecipes.map(renderRecipeCard)}</div>

      <h2 className='plats-populaires'>Suggestions du jour</h2>
      <div className="recipes-list">{suggestedRecipes.map(renderRecipeCard)}</div>

      <div className="all-comments-section">
        <h2 className="plats-commentez">Derniers commentaires</h2>
        <div className="all-comments-inner">
          {allComments.length > 0 ? (
            allComments.slice(0, 10).map((comment) => (
              <div key={comment._id} className="comment-card">
                <p className="comment-author">
                  <strong>{comment.name}</strong> sur{" "}
                  <em>{recipes.find((r) => r._id === comment.recipeId)?.title || 'Recette inconnue'}</em>
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
    </div>
  );
};

export default Body;
