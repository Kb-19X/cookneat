import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import axios from "axios";
import { IconButton, Tooltip } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const API_URL =
  process.env.REACT_APP_API_URL || "https://cookneat-server.onrender.com";

const ProductDetails = () => {
  const { id } = useParams();
  const [liked, setLiked] = useState(false);
  const [personnes, setPersonnes] = useState(4);
  const [recette, setRecette] = useState(null);
  const [allComments, setAllComments] = useState([]);

  // Commentaires
  const [commentText, setCommentText] = useState("");
  const [commentRating, setCommentRating] = useState(""); // optionnel
  const [commentImage, setCommentImage] = useState(null);
  const [commentPreview, setCommentPreview] = useState(null);
  const [commentError, setCommentError] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/recipes/${id}`);
        const recipe = res.data;
        const cleanedSteps = Array.isArray(recipe.steps)
          ? recipe.steps.map(s => s.description?.trim()).filter(Boolean)
          : [];
        setRecette({ ...recipe, steps: cleanedSteps });
      } catch (err) {
        console.error("❌ Erreur lors du chargement de la recette :", err);
      }
    };

    const fetchAllComments = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/comments?recipeId=${id}`);
        setAllComments(res.data);
      } catch (err) {
        console.error("❌ Erreur lors du chargement des commentaires :", err);
      }
    };

    fetchRecipe();
    fetchAllComments();
  }, [id]);

  const handleCommentImageChange = (e) => {
    const file = e.target.files[0];
    setCommentImage(file);
    setCommentPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleCommentSubmit = async () => {
    setCommentError("");
    if (!commentText.trim()) return setCommentError("Le commentaire ne peut pas être vide.");

    const token = localStorage.getItem("token");
    if (!token) return setCommentError("Vous devez être connecté pour commenter.");

    const formData = new FormData();
    formData.append("recipeId", id);
    formData.append("text", commentText);
    if (commentRating) formData.append("rating", commentRating); // rating optionnel
    if (commentImage) formData.append("image", commentImage);

    try {
      await axios.post(`${API_URL}/api/comments`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      setCommentText("");
      setCommentRating("");
      setCommentImage(null);
      setCommentPreview(null);

      const res = await axios.get(`${API_URL}/api/comments?recipeId=${id}`);
      setAllComments(res.data);
    } catch (err) {
      console.error(err);
      setCommentError("❌ Erreur lors de l'envoi du commentaire. Réessayez.");
    }
  };

  if (!recette) return <p className="loading">Chargement...</p>;

  return (
    <div className="background-product">
      <div className="recette-page">
        <img
          src={recette.imageUrl?.startsWith("http") ? recette.imageUrl : `${API_URL}${recette.imageUrl}` || "/placeholder-image.png"}
          alt={recette.title}
          className="recette-img"
        />

        <div className="product-desc">
          <h1>{recette.title}</h1>
          <p>{recette.description}</p>
        </div>

        <div className="actions">
          <Tooltip title="Aimer">
            <IconButton onClick={() => setLiked(!liked)} aria-label="like button">
              {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Partager">
            <IconButton onClick={() => navigator.clipboard.writeText(window.location.href)} aria-label="share button">
              <ShareIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Commentaires">
            <IconButton
              onClick={() => document.getElementById("commentaires")?.scrollIntoView({ behavior: "smooth" })}
              aria-label="comments button"
            >
              <ChatBubbleOutlineIcon />
            </IconButton>
          </Tooltip>
        </div>

        {/* Ajouter un commentaire */}
        <div className="add-comment-section">
          <h2>Ajouter un commentaire</h2>
          {commentError && <p className="comment-error">{commentError}</p>}
          <textarea
            placeholder="Écrivez votre commentaire..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <input type="number" placeholder="Note (1-5)" value={commentRating} min="1" max="5" onChange={(e) => setCommentRating(e.target.value)} />
          <input type="file" accept="image/*" onChange={handleCommentImageChange} />
          {commentPreview && <img src={commentPreview} alt="Prévisualisation" className="comment-preview" />}
          <button onClick={handleCommentSubmit}>Envoyer</button>
        </div>

        {/* Commentaires existants */}
        <div id="commentaires" className="all-comments-section">
          <h2>🗣️ Derniers commentaires</h2>
          {allComments.length > 0 ? (
            allComments.map((comment) => (
              <div key={comment._id || comment.id} className="comment-card">
                <p><strong>{comment.name}</strong> :</p>
                <p>{comment.text}</p>
                {comment.imageUrl && <img src={`${API_URL}${comment.imageUrl}`} alt="Commentaire" className="comment-image"/>}
                <p>⭐ {comment.rating || "Non noté"} / 5</p>
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

export default ProductDetails;
