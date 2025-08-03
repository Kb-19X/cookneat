import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Recette_du_jour.css";

import comment from "../../assets/ImagePlatsPage/comment.png";
import like from "../../assets/ImagePlatsPage/like.png";
import share from "../../assets/ImagePlatsPage/share.png";
import tool from "../../assets/ImageHomePage/tool.png";
import ossobuco from "../../assets/ImageHomePage/osoobuco.jpg";

const Recette_du_jour = () => {
  const [liked, setLiked] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState(null);

  const recipeId = "64ebf407a48e012345678abc"; // Remplace par l’ID réel de ta recette

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setUser({
          id: decoded.id,
          name: decoded.name,
          token,
        });
      } catch (err) {
        console.error("❌ Token invalide :", err);
        setUser(null);
      }
    }
  }, []);

  const loadComments = () => {
    axios
      .get(`/api/comments?recipeId=${recipeId}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setComments(res.data);
        } else {
          console.warn("Données commentaires inattendues:", res.data);
          setComments([]);
        }
      })
      .catch((err) => console.error("❌ Erreur chargement commentaires :", err));
  };

  useEffect(() => {
    loadComments(); // chargement initial
  }, [recipeId]);

  const handleLike = () => setLiked(!liked);



  const handleCommentToggle = () => {
    setShowComments(!showComments);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    try {
      await axios.post(
        `/api/comments`,
        {
          recipeId,
          text: newComment,
          rating,
          name: user.name,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setNewComment("");
      setRating(5);
      setSuccessMessage("✅ Commentaire envoyé !");
      setTimeout(() => setSuccessMessage(""), 3000);
      setShowComments(true);
      loadComments(); // Recharge les commentaires après envoi
    } catch (err) {
      console.error("❌ Erreur envoi commentaire :", err.response?.data || err);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Lien copié !");
  };

return (
  <div className="pagejour">
    <div className="description-pagejour">
      <p className="pagejour-texte">
        "Découvrez chaque jour des recettes savoureuses et faciles à réaliser
        pour régaler vos proches !"
      </p>
    </div>

    <div className="recettedujour">
      <img src={tool} alt="outil" />
      <h1 className="titre-recetteday">👨‍🍳 Inspiration du jour : Osso Buco</h1>
      <img src={tool} alt="outil" />
    </div>

    <div className="recetteday-container">
      <div className="recetteday-left">
        <img src={ossobuco} alt="Osso buco" />
        <h1>Osso buco</h1>
      </div>

      <div className="recetteday-right">
        <p className="titre-recetteday-2">
          Plongez dans les saveurs de l'Italie avec notre recette du jour !
        </p>

        <div className="stars-homepage">
          <div className="stars-header">
            <div className="stars-left">
              {"★".repeat(5)} <span className="avis-count">{comments.length} avis</span>
            </div>

            <div className="com-recetteday">
              <img
                src={like}
                alt="like"
                onClick={handleLike}
                className={`icon ${liked ? "liked" : ""}`}
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

          {successMessage && <div className="success-message">{successMessage}</div>}

          {/* Champ d'ajout de commentaire directement affiché si connecté */}
          {user ? (
            <div className="comment-section">
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
                placeholder="Écrivez un commentaire..."
                className="comment-input"
              />
              <button onClick={handleCommentSubmit} className="comment-btn">Envoyer</button>
            </div>
          ) : (
            <div className="login-warning">🔒 Connectez-vous pour commenter.</div>
          )}

          {/* Affichage des commentaires */}
          {showComments && (
            <div className="comments-display">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment._id} className="comment-card">
                    <div className="comment-header">
                      <strong>{comment.name}</strong>
                      <span className="rating">⭐ {comment.rating}/5</span>
                    </div>
                    <p className="comment-text">{comment.text}</p>
                    <small className="comment-date">
                      {new Date(comment.createdAt).toLocaleString()}
                    </small>
                  </div>
                ))
              ) : (
                <p>Aucun commentaire encore.</p>
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
