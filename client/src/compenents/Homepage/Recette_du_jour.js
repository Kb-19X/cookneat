import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Recette_du_jour.css";

import comment from "../../assets/ImagePlatsPage/comment.png";
import like from "../../assets/ImagePlatsPage/like.png";
import share from "../../assets/ImagePlatsPage/share.png";
import tool from "../../assets/ImageHomePage/tool.png";
import ossobuco from "../../assets/ImageHomePage/osoobuco.jpg";
import API_URL from '../config';

fetch(`${API_URL}/recipes`)

const Recette_du_jour = () => {
  const [liked, setLiked] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [successMessage, setSuccessMessage] = useState("");

  const dishId = "recette-du-jour";

  useEffect(() => {
    if (showComments) {
      axios
        .get(`/api/comments/${dishId}`)
        .then((res) => setComments(res.data))
        .catch((err) =>
          console.error("Erreur chargement commentaires :", err)
        );
    }
  }, [showComments]);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleCommentIconClick = () => {
    setShowCommentForm(!showCommentForm);
    setSuccessMessage("");
    if (!showCommentForm) {
      setShowComments(false);
    }
  };

  const handleCommentToggle = () => {
    setShowComments(!showComments);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !newComment.trim()) return;

    try {
      const res = await axios.post(`/api/comments/${dishId}`, {
        name,
        text: newComment,
        rating,
      });
      setComments([...comments, res.data]);
      setNewComment("");
      setName("");
      setRating(5);
      setSuccessMessage("✅ Commentaire envoyé !");
      setTimeout(() => setSuccessMessage(""), 3000);
      setShowCommentForm(false);
      setShowComments(false);
    } catch (err) {
      console.error("Erreur API :", err);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Lien copié dans le presse-papiers !");
  };

  return (
    <div className="pagejour">
      <div className="description-pagejour">
        <p className="pagejour-texte">
          "Découvrez chaque jour des recettes savoureuses et faciles à réaliser
          pour régaler vos proches ! Inspirez-vous, cuisinez, et partagez des
          moments gourmands."
        </p>
      </div>

      <div className="recettedujour">
        <img src={tool} alt="outil" />
        <h1>La recette du jour</h1>
        <img src={tool} alt="outil" />
      </div>

      <div className="recetteday-container">
        <div className="recetteday-left">
          <img src={ossobuco} alt="Osso buco" />
          <h1>Osso buco</h1>
        </div>

        <div className="recetteday-right">
          <p className="titre-recetteday">
            Plongez dans les saveurs de l'Italie avec notre recette du jour,
            l'Osso Buco !
          </p>
          <p className="stitre-recetteday">
            Ce plat traditionnel milanais, à base de jarret de veau mijoté, est
            connu pour sa viande fondante et son goût irrésistible, agrémenté
            d'arômes d'ail, de vin blanc et d'herbes fraîches. Accompagné de
            gremolata, l'Osso Buco s'harmonise à merveille avec un risotto alla
            milanese ou des tagliatelles fraîches.
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
                  onClick={handleCommentIconClick}
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

            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}

            {showCommentForm && (
              <div className="comment-popup">
                <form className="form-comment" onSubmit={handleCommentSubmit}>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Votre nom"
                    className="comment-input"
                  />
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                    placeholder="Note (1 à 5)"
                    className="comment-input"
                  />
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Ajouter un commentaire..."
                    className="comment-input"
                  />
                  <button type="submit" className="comment-btn">
                    Envoyer
                  </button>
                </form>

                <button
                  className="toggle-comments-btn"
                  onClick={handleCommentToggle}
                >
                  {showComments ? "Masquer les commentaires" : "Voir les commentaires"}
                </button>

                {showComments && (
                  <div className="comment-scroll-container">
                    <ul className="comment-list">
                      {comments.map((comment) => (
                        <li key={comment._id}>
                          <strong>{comment.name}</strong> ({comment.rating}/5) <br />
                          {comment.text} <br />
                          <small>{new Date(comment.createdAt).toLocaleString()}</small>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recette_du_jour;
