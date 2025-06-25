import React, { useEffect, useState } from 'react';
import './Profil.css';
import user from "../../assets/ImageHomePage/user.png";
import axios from 'axios';

const Profil = () => {
  const [username, setUsername] = useState('');
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [myComments, setMyComments] = useState([]);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const token = localStorage.getItem('token');
    if (!token) return;

    // 🔥 Charger les recettes likées
    axios.get('https://cookneat-server.onrender.com/api/recipes/liked', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setLikedRecipes(res.data))
      .catch(err => console.error('Erreur chargement recettes likées :', err));

    // 🔥 Charger les commentaires de l’utilisateur
    axios.get('https://cookneat-server.onrender.com/api/comments/mine', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setMyComments(res.data))
      .catch(err => console.error('Erreur chargement commentaires :', err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/';
  };

  return (
    <div className="profil-page">
      <div className="profil-header">
        <img src={user} alt="User Icon" className="profil-avatar" />
        <h2>Bienvenue, {username} !</h2>
        <button onClick={handleLogout} className="logout-btn">
          Se déconnecter
        </button>
      </div>

      <div className="profil-section">
        <h3 className="recettes-likés">💖 Recettes likées</h3>
        <div className="cards-grid">
          {likedRecipes.length === 0 ? (
            <p>Aucune recette likée pour le moment.</p>
          ) : (
            likedRecipes.map((recipe) => (
              <div key={recipe._id} className="card">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="card-img"
                />
                <div className="card-body">
                  <h4 className="card-title">{recipe.title}</h4>
                  <a href={`/recette/${recipe._id}`} className="card-link">
                    Voir la recette
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="profil-section">
        <h3 className="commentaires-likés">💬 Mes commentaires</h3>
        <ul className="comment-list">
          {myComments.length === 0 ? (
            <p>Tu n’as pas encore écrit de commentaire.</p>
          ) : (
            myComments.map((comment, index) => (
              <li key={index}>
                <strong>{comment.recipeTitle}</strong> : {comment.text}
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="ajout-recettes-container">
        <a href="/AjoutRecettes" className="my-recipes-btn">
          Ajouter une recette +
        </a>
      </div>
    </div>
  );
};

export default Profil;
