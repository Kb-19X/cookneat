import React, { useState } from 'react';
import './Recette_du_jour.css';

import comment from '../../assets/ImagePlatsPage/comment.png';
import like from '../../assets/ImagePlatsPage/like.png';
import share from '../../assets/ImagePlatsPage/share.png';
import tool from '../../assets/ImageHomePage/tool.png';
import ossobuco from '../../assets/ImageHomePage/osoobuco.jpg';

const Recette_du_jour = () => {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleCommentToggle = () => {
    console.log("Clic sur l’icône commentaire");
    setShowComments(!showComments);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Lien copié dans le presse-papiers !');
  };

  return (
    <div className='pagejour'>  
      <div className='description-pagejour'>
        <p className='pagejour-texte'>
          "Découvrez chaque jour des recettes savoureuses et faciles à réaliser pour régaler vos proches ! Inspirez-vous, cuisinez, et partagez des moments gourmands."
        </p>
      </div>

      <div className='recettedujour'>
        <img src={tool} alt="outil" />
        <h1>La recette du jour</h1>
        <img src={tool} alt="outil" />
      </div>

      <div className='recetteday-container'>
        <div className='recetteday-left'>
          <img src={ossobuco} alt="Osso buco" />
          <h1>Osso buco</h1>
        </div>

        <div className='recetteday-right'>
          <p className='titre-recetteday'>
            Plongez dans les saveurs de l'Italie avec notre recette du jour, l'Osso Buco !
          </p>
          <p className='stitre-recetteday'>
            Ce plat traditionnel milanais, à base de jarret de veau mijoté, est connu pour sa viande fondante et son goût irrésistible, agrémenté d'arômes d'ail, de vin blanc et d'herbes fraîches. Accompagné de gremolata, l'Osso Buco s'harmonise à merveille avec un risotto alla milanese ou des tagliatelles fraîches.
          </p>

          <div className="stars">
            <div className="stars-header">
              <div className="stars-left">
                <span className="first-stars">★</span>
                <span className="starsspan">★</span>
                <span className="starsspan">★</span>
                <span className="starsspan">★</span>
                <span className="starsspan">★</span>
                <span className="avis-count">56 avis</span>
              </div>

              <div className="com-recetteday">
                <img
                  src={like}
                  alt="like"
                  onClick={handleLike}
                  className="icon"
                />
                <img
                  src={comment}
                  alt="comment"
                  onClick={handleCommentToggle}
                  className="icon"
                />
                <img
                  src={share}
                  alt="share"
                  onClick={handleShare}
                  className="icon"
                />
              </div>
            </div>

            {showComments && (
              <div className="comment-popup">
                <form className='form-comment' onSubmit={handleCommentSubmit}>
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Ajouter un commentaire..."
                    className="comment-input"
                  />
                  <button type="submit" className="comment-btn">Envoyer</button>
                </form>
                <ul className="comment-list">
                  {comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recette_du_jour;
