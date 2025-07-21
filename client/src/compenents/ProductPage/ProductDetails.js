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

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/recipes/${id}`);
        const recipe = res.data;

        // Log pour vérifier le contenu
        console.log("✅ Donnée reçue pour la recette :", recipe);

        // Nettoyage des étapes
        let cleanedSteps = [];
        if (Array.isArray(recipe.steps)) {
          cleanedSteps = recipe.steps.filter(
            (s) => typeof s === "string" && s.trim().length > 0
          );
        } else if (typeof recipe.steps === "string") {
          cleanedSteps = recipe.steps
            .split(/\r?\n/)
            .map((s) => s.trim())
            .filter((s) => s.length > 0);
        }

        setRecette({
          ...recipe,
          steps: cleanedSteps
        });
      } catch (err) {
        console.error("❌ Erreur lors du chargement de la recette :", err);
      }
    };

    const fetchAllComments = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/comments`);
        setAllComments(res.data);
      } catch (err) {
        console.error("❌ Erreur lors du chargement des commentaires :", err);
      }
    };

    fetchRecipe();
    fetchAllComments();
  }, [id]);

  const incrementPersonnes = () => setPersonnes((p) => p + 1);
  const decrementPersonnes = () => setPersonnes((p) => (p > 1 ? p - 1 : 1));

  const adjustedIngredients = useMemo(() => {
    if (!recette?.ingredients || recette.ingredients.length === 0) return [];

    return recette.ingredients.map((ing) => {
      const match = ing.match(/^([\d.,]+)\s*(\w*)\s*de\s+(.*)/i);
      if (!match) return { name: ing, quantity: null, unit: null };

      const quantity = parseFloat(match[1].replace(",", ".")) || 0;
      const unit = match[2] || "";
      const name = match[3];

      return {
        name,
        unit,
        adjustedQuantity: ((quantity * personnes) / 4).toFixed(1),
      };
    });
  }, [recette, personnes]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recette?.title,
        text: recette?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Lien copié dans le presse-papiers !");
    }
  };

  if (!recette) return <p className="loading">Chargement...</p>;

  return (
    <div className="background-product">
      <div className="recette-page">
        <img
          src={
            recette.imageUrl?.startsWith("http")
              ? recette.imageUrl
              : `${API_URL}${recette.imageUrl}`
          }
          alt={recette.title}
          className="recette-img"
        />

        <div className="product-desc">
          <h1>{recette.title}</h1>
          <p>{recette.description}</p>
        </div>

        <div className="actions">
          <Tooltip title="Aimer">
            <IconButton onClick={() => setLiked(!liked)}>
              {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Partager">
            <IconButton onClick={handleShare}>
              <ShareIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Commentaires">
            <IconButton
              onClick={() => {
                const section = document.getElementById("commentaires");
                if (section) section.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <ChatBubbleOutlineIcon />
            </IconButton>
          </Tooltip>
        </div>

        <div className="product-ingredients">
          <div className="product-ingredients-header">
            <h2>Ingrédients</h2>
            <div className="product-personnes-control">
              <button onClick={decrementPersonnes}>−</button>
              <span>{personnes} personnes</span>
              <button onClick={incrementPersonnes}>+</button>
            </div>
          </div>

          <div className="product-time">
            <p>
              <AccessTimeIcon fontSize="small" /> <strong>Préparation :</strong>{" "}
              {recette.prepTime || "?"} min
            </p>
            <p>
              <AccessTimeIcon fontSize="small" /> <strong>Cuisson :</strong>{" "}
              {recette.cookTime || "?"} min
            </p>
            <p>
              <AccessTimeIcon fontSize="small" /> <strong>Total :</strong>{" "}
              {recette.totalTime || "?"} min
            </p>
          </div>

          <div className="product-ingredients-grid">
            {adjustedIngredients.map((item, i) => (
              <div className="product-ingredient-card" key={i}>
                <p className="product-ingredient-quantity">
                  <strong>
                    {item.adjustedQuantity} {item.unit}
                  </strong>
                </p>
                <p className="product-ingredient-name">de {item.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="product-preparation-section">
          <h2 className="product-preparation-title">Préparation</h2>
          {recette.steps && recette.steps.length > 0 ? (
            recette.steps.map((step, i) => (
              <div key={i} className="preparation-step">
                <h3 className="preparation-step-title">Étape {i + 1}</h3>
                <p className="preparation-step-text">{step}</p>
              </div>
            ))
          ) : (
            <p className="no-steps">Aucune étape définie pour cette recette.</p>
          )}
        </div>

        <div id="commentaires" className="all-comments-section">
          <h2 className="plats-commentez">🗣️ Derniers commentaires</h2>
          {Array.isArray(allComments) && allComments.length > 0 ? (
            allComments
              .filter((c) => c.recipeId === recette._id)
              .slice(0, 10)
              .map((comment) => (
                <div key={comment._id} className="comment-card">
                  <p>
                    <strong>{comment.name}</strong> :
                  </p>
                  <p>{comment.text}</p>
                  <p>⭐ {comment.rating || 5} / 5</p>
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
