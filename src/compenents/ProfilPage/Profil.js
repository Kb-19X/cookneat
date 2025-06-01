import React, { useEffect, useState } from 'react';
import './Profil.css';
import user from "../../assets/ImageHomePage/user.png";

import pizza4fromages from "../../assets/ImageHomePage/pizza4fromages.jpeg";

const Profil = () => {
  const [username, setUsername] = useState('');
  const [likedRecipes, setLikedRecipes] = useState([
    {
      id: 1,
      title: 'Osso Buco',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 2,
      title: 'Tartiflette',
      image: 'https://via.placeholder.com/300x200',
    },
  ]);
  const [myComments, setMyComments] = useState([
    {
      recipeTitle: 'Osso Buco',
      text: 'Délicieux, je recommande ! ⭐⭐⭐⭐',
    },
    {
      recipeTitle: 'Tartiflette',
      text: 'Trop bon 😋 ⭐⭐⭐⭐⭐',
    },
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUsername(storedUser);
    }
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
          {likedRecipes.map((recipe) => (
            <div key={recipe.id} className="card">
              <img
                src={pizza4fromages}
                alt={recipe.title}
                className="card-img"
              />
              <div className="card-body">
                <h4 className="card-title">{recipe.title}</h4>
                <a href={`/recette/${recipe.id}`} className="card-link">
                  Voir la recette
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="profil-section">
        <h3 className="commentaires-likés">💬 Mes commentaires</h3>
        <ul className="comment-list">
          {myComments.map((comment, index) => (
            <li key={index}>
              <strong>{comment.recipeTitle}</strong> : {comment.text}
            </li>
          ))}
        </ul>
      </div>

      <div className="profil-section">
        <a href="/AjoutRecettes" className="my-recipes-btn">
          + Créer ma recette
        </a>
      </div>
    </div>
  );
};

export default Profil;
