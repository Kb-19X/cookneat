import React, { useState } from 'react';
import './Body.css';

import Risotto from '../../assets/ImageHomePage/Risotto alla Milanese.jpg';
import bruschetta from '../../assets/ImageHomePage/bruschetta.jpg';
import ossobuco from '../../assets/ImageHomePage/osoobuco.jpg';
import pesto_alla_genovese from '../../assets/ImageFeculentPage/pesto_alla_genovese.webp';
import pates_thon from '../../assets/ImageFeculentPage/pates_thon.jpg';
import pate_ricotta from '../../assets/ImageFeculentPage/pate_ricotta.jpeg';

import commentimage from '../../assets/ImageHomePage/comment.png';
import like from '../../assets/ImageHomePage/like.png';
import share from '../../assets/ImageHomePage/share.png';

import countries from '../../assets/ImageHomePage/countries.png';


const Body = () => {
  const recipes = [
    {
        id: 1,
        title: "Pesto alla Genovese",
        image: pesto_alla_genovese,
        time: "35 minutes",
        rating: "★★★★★",
        reviews: "35 avis",
      },
      {
        id: 2,
        title: "Pâtes au Thon",
        image: pates_thon,
        time: "35 minutes",
        rating: "★★★★★",
        reviews: "35 avis",
      },
      {
        id: 3,
        title: "Pâtes Ricotta",
        image: pate_ricotta,
        time: "35 minutes",
        rating: "★★★★★",
        reviews: "35 avis",
      },
    ];
  
    const [comments, setComments] = useState({});
    const [showComment, setShowComment] = useState(null); // On garde un seul ID actif
  
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
      setShowComment(prev => prev === id ? null : id); // Si on clique sur la même recette, on cache la section
    };
  
    return (
        <div>
        <div className="plats-titres">
            <img src={countries} alt="" />
            <h1>Plats</h1>
            <img src={countries} alt="" />
    </div>
      <div className="feculent-container">
        {/* Colonne gauche */}
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
                    onClick={() => toggleCommentSection(recipe.id)} // Toggle comment section for this recipe
                  />
                  <img src={share} alt="Share" />
                </div>
                <div className={`comment-section ${showComment === recipe.id ? 'show' : ''}`}>
                  <input
                    type="text"
                    value={comments[recipe.id] || ''}
                    onChange={(e) => handleCommentChange(recipe.id, e.target.value)}
                    placeholder="Écrivez un commentaire..."
                  />
                  <button onClick={() => submitComment(recipe.id)}>Envoyer</button>
                </div>
              </div>
            </div>
          ))}
       
  
      </div>
      </div>
    );
  };
export default Body;
