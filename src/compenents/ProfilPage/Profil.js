import React, { useEffect, useState } from 'react';
import './Profil.css';
import user from "../../assets/ImageHomePage/user.png"; // ← à ajouter dans ton dossier

const Profil = () => {
  const [username, setUsername] = useState('');
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [myComments, setMyComments] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUsername(storedUser);
    }

    // Tu pourras ajouter ici la logique pour charger les recettes likées et les commentaires
    // via des requêtes axios si tu veux aller plus loin
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/'; // ou navigate('/')
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
        <h3 className="recettes-likés"> Recettes likées </h3>
        <ul className="liked-list">
          {/* À remplacer par map sur likedRecipes */}
          <li>Osso Buco</li>
          <li>Tartiflette</li>
        </ul>
      </div>

      <div className="profil-section">
        <h3 className="commentaires-likés">💬 Mes commentaires</h3>
        <ul className="comment-list">
          {/* À remplacer par map sur myComments */}
          <li>
            <strong>Osso Buco</strong> : Délicieux, je recommande ! ⭐⭐⭐⭐
          </li>
          <li>
            <strong>Tartiflette</strong> : Trop bon 😋 ⭐⭐⭐⭐⭐
          </li>
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
