import './Catégorie.css'
import React, { useState } from 'react';

import commentimage from '../../assets/ImageHomePage/comment.png';
import like from '../../assets/ImageHomePage/like.png';
import share from '../../assets/ImageHomePage/share.png';
import bruschetta from '../../assets/ImageHomePage/bruschetta.jpg';
import pizza4fromages from '../../assets/ImageHomePage/pizza4fromages.jpeg';
import blanquette_veau from '../../assets/ImageHomePage/blanquette_veau.jpg';

const Catégorie = () => { // Nom du composant corrigé ici
  const recipes = [
    { id: 1, title: "blanquette_veau", image: blanquette_veau, time: "35 minutes", rating: "★★★★★", reviews: "35 avis" },
    { id: 2, title: "bruschetta", image: bruschetta, time: "35 minutes", rating: "★★★★★", reviews: "35 avis" },
    { id: 3, title: "pizza4fromages", image: pizza4fromages, time: "35 minutes", rating: "★★★★★", reviews: "35 avis" },
  ];

  const [comments, setComments] = useState({});
  const [showComment, setShowComment] = useState(null);

  const handleCommentChange = (id, value) => {
    setComments((prev) => ({ ...prev, [id]: value }));
  };

  const submitComment = (id) => {
    if (!comments[id] || comments[id].trim() === '') {
      alert('Le commentaire ne peut pas être vide.');
      return;
    }
    console.log(`Commentaire pour la recette ${id} : ${comments[id]}`);
    setComments((prev) => ({ ...prev, [id]: '' })); // Efface le commentaire après soumission
  };

  const toggleCommentSection = (id) => {
    setShowComment(prev => (prev === id ? null : id)); // Affiche/masque la section commentaire en fonction de l'ID
  };

  return (
    <div className='plats-body-container'>
      <div className="plats-titres">
        <h1>Plats</h1>
      </div>

      <div className="recipes-list">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <div className="recipe-image">
              <img src={recipe.image} alt={recipe.title} />
            </div>
            <div className="recipe-info">
              <h3>{recipe.title}</h3>
              <p className="recipe-time">{recipe.time}</p>
              <div className="recipe-rating">
                <span>{recipe.rating}</span>
                <span>{recipe.reviews}</span>
              </div>
              <div className="recipe-actions">
                <img src={like} alt="Like" />
                <img
                  src={commentimage}
                  alt="Comment"
                  onClick={() => toggleCommentSection(recipe.id)} // Afficher/masquer les commentaires
                />
                <img src={share} alt="Share" />
              </div>

              {showComment === recipe.id && (
                <div className="comment-section show">
                  <input
                    type="text"
                    value={comments[recipe.id] || ''}
                    onChange={(e) => handleCommentChange(recipe.id, e.target.value)}
                    placeholder="Écrivez un commentaire..."
                  />
                  <button onClick={() => submitComment(recipe.id)}>Envoyer</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catégorie; // Export du composant corrigé
