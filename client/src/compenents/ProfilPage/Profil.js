import React, { useEffect, useState } from 'react';
import './Profil.css';
import userIcon from '../../assets/ImageHomePage/user.png';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // correction import

const Profil = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState(''); // <-- nouveau state pour le rôle
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [myComments, setMyComments] = useState([]);
  const [myRecipes, setMyRecipes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token récupéré :", token);
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      console.log("Token décodé :", decoded);
      setUsername(decoded.name);
      setRole(decoded.role || ''); // récupérer le rôle admin / user

      axios.get('https://cookneat-server.onrender.com/api/recipes/liked', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        console.log("Recettes likées reçues :", res.data);
        setLikedRecipes(res.data);
      })
      .catch(err => console.error('Erreur chargement recettes likées :', err));

      axios.get('https://cookneat-server.onrender.com/api/comments/mine', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        console.log("Commentaires reçus :", res.data);
        setMyComments(res.data);
      })
      .catch(err => console.error('Erreur chargement commentaires :', err));

      axios.get('https://cookneat-server.onrender.com/api/recipes/mes-recettes', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        console.log("Mes recettes reçues :", res.data);
        setMyRecipes(res.data);
      })
      .catch(err => console.error('Erreur chargement de mes recettes :', err));

    } catch (err) {
      console.error("Token invalide :", err);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const handleDeleteComment = async (commentId) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await axios.delete(`https://cookneat-server.onrender.com/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMyComments(myComments.filter(c => c._id !== commentId));
    } catch (err) {
      console.error("Erreur suppression commentaire :", err);
    }
  };

  return (
    <div className="profil-page">
      <div className="profil-header">
        <img src={userIcon} alt="User Icon" className="profil-avatar" />
        <h2>Bienvenue, {username} !</h2>

        {/* Bouton dashboard visible uniquement si admin */}
        {role === 'admin' && (
          <button 
            className="dashboard-btn"
            onClick={() => window.location.href = '/dashboard'}
          >
            Accéder au Dashboard
          </button>
        )}

        <button onClick={handleLogout} className="logout-btn">Se déconnecter</button>
      </div>

      <p className="user-stats">
        {likedRecipes.length === 0 && myComments.length === 0 && myRecipes.length === 0 && (
          <>
            👋 Salut {username || 'cher·e gourmand·e'} !  
            <br />
            Tu es tout juste arrivé·e, n’hésite pas à explorer les recettes et à partager ta passion en likant, commentant et créant tes propres plats ! 🍳✨
          </>
        )}

        {(likedRecipes.length > 0 || myComments.length > 0 || myRecipes.length > 0) && (
          <>
            {likedRecipes.length > 0 && <>💖 Tu as liké <strong>{likedRecipes.length}</strong> recette{likedRecipes.length > 1 ? 's' : ''} savoureuse{likedRecipes.length > 1 ? 's' : ''}.</>}
            {likedRecipes.length > 0 && (myComments.length > 0 || myRecipes.length > 0) && <> &nbsp;·&nbsp; </>}
            {myComments.length > 0 && <>💬 Tu as partagé <strong>{myComments.length}</strong> commentaire{myComments.length > 1 ? 's' : ''} plein{myComments.length > 1 ? 's' : ''} de saveurs.</>}
            {myComments.length > 0 && myRecipes.length > 0 && <> &nbsp;·&nbsp; </>}
            {myRecipes.length > 0 && <>📚 Tu as posté <strong>{myRecipes.length}</strong> recette{myRecipes.length > 1 ? 's' : ''} maison{myRecipes.length > 1 ? 's' : ''}.</>}
            <br />
            Continue à explorer et régaler la communauté ! 🍽️🔥
          </>
        )}
      </p>

      <div className="profil-section">
        <h3 className="recettes-likés">💖 Recettes likées</h3>
        <div className="cards-grid">
          {likedRecipes.length === 0 ? (
            <p>Aucune recette likée pour le moment.</p>
          ) : (
            likedRecipes.map((recipe) => (
              <div key={recipe._id} className="card">
                <img src={recipe.imageUrl} alt={recipe.title || "Recette"} className="card-img" />
                <div className="card-body">
                  <h4 className="card-title">{recipe.title}</h4>
                  <a href={`/recette/${recipe._id}`} className="card-link">Voir la recette</a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="profil-section">
        <h3 className="mes-recettes">📚 Mes recettes</h3>
        <div className="cards-grid">
          {myRecipes.length === 0 ? (
            <p>Tu n’as pas encore ajouté de recette.</p>
          ) : (
            myRecipes.map(recipe => (
              <div key={recipe._id} className="card">
                <img src={recipe.imageUrl} alt={recipe.title || "Recette"} className="card-img" />
                <div className="card-body">
                  <h4 className="card-title">{recipe.title}</h4>
                  <a href={`/EditRecipe/${recipe._id}`} className="card-link">Modifier</a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="profil-section">
        <h3 className="mes-commentaires">💬 Mes commentaires</h3>
        <ul className="comment-list">
          {myComments.length === 0 ? (
            <p>Tu n’as pas encore écrit de commentaire.</p>
          ) : (
            myComments.map((comment) => (
              <li key={comment._id}>
                <strong>{comment.recipeTitle}</strong> : {comment.text}
                <button className="delete-comment-btn" onClick={() => handleDeleteComment(comment._id)}>❌</button>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="ajout-recettes-container">
        <a href="/AjoutRecettes" className="my-recipes-btn">Ajouter une recette +</a>
      </div>
    </div>
  );
};

export default Profil;
