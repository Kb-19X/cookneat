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

        // Nettoyage des étapes : on garde uniquement les descriptions non vides
        let cleanedSteps = [];
        if (Array.isArray(recipe.steps)) {
          cleanedSteps = recipe.steps
            .map((step) => step.description?.trim())
            .filter((desc) => desc && desc.length > 0);
        }

        setRecette({
          ...recipe,
          steps: cleanedSteps,
        });
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

  const incrementPersonnes = () => setPersonnes((p) => p + 1);
  const decrementPersonnes = () => setPersonnes((p) => (p > 1 ? p - 1 : 1));

  // Calcul des quantités ajustées en fonction du nombre de personnes
  const adjustedIngredients = useMemo(() => {
    if (!recette?.ingredients || recette.ingredients.length === 0) return [];

    return recette.ingredients.map(
      ({ name, quantity, unit = "", imageUrl = null }) => {
        let number = null;

        if (typeof quantity === "string") {
          if (quantity.includes("/")) {
            const parts = quantity.split("/");
            if (
              parts.length === 2 &&
              !isNaN(parts[0]) &&
              !isNaN(parts[1]) &&
              parseFloat(parts[1]) !== 0
            ) {
              number = parseFloat(parts[0]) / parseFloat(parts[1]);
            }
          } else {
            const parsed = parseFloat(quantity.replace(",", "."));
            if (!isNaN(parsed)) number = parsed;
          }
        } else if (typeof quantity === "number") {
          number = quantity;
        }

        if (number === null || isNaN(number)) {
          return { name, quantity, adjustedQuantity: quantity, unit, imageUrl };
        }

        let adjustedQty = ((number * personnes) / 4).toFixed(1);
        if (adjustedQty.endsWith(".0")) adjustedQty = adjustedQty.slice(0, -2);

        return { name, quantity, adjustedQuantity: adjustedQty, unit, imageUrl };
      }
    );
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
            recette.imageUrl
              ? recette.imageUrl.startsWith("http")
                ? recette.imageUrl
                : `${API_URL}${recette.imageUrl}`
              : "/placeholder-image.png"
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
            <IconButton onClick={() => setLiked(!liked)} aria-label="like button">
              {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Partager">
            <IconButton onClick={handleShare} aria-label="share button">
              <ShareIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Commentaires">
            <IconButton
              onClick={() => {
                const section = document.getElementById("commentaires");
                if (section) section.scrollIntoView({ behavior: "smooth" });
              }}
              aria-label="comments button"
            >
              <ChatBubbleOutlineIcon />
            </IconButton>
          </Tooltip>
        </div>

        <div className="product-ingredients">
          <div className="product-ingredients-header">
            <h2>Ingrédients</h2>
            <div className="product-personnes-control">
              <button onClick={decrementPersonnes} aria-label="diminuer personnes">
                −
              </button>
              <span>
                {personnes} personne{personnes > 1 ? "s" : ""}
              </span>
              <button onClick={incrementPersonnes} aria-label="augmenter personnes">
                +
              </button>
            </div>
          </div>

          <div className="product-time">
            <p>
              <AccessTimeIcon fontSize="small" /> <strong>Préparation :</strong>{" "}
              {recette.prepTime || "?"}
            </p>
            <p>
              <AccessTimeIcon fontSize="small" /> <strong>Cuisson :</strong>{" "}
              {recette.cookTime || "?"}
            </p>
            <p>
              <AccessTimeIcon fontSize="small" /> <strong>Total :</strong>{" "}
              {recette.totalTime || "?"}
            </p>
          </div>

          <div className="product-ingredients-grid">
            {adjustedIngredients.length > 0 ? (
              adjustedIngredients.map(
                ({ name, adjustedQuantity, unit, imageUrl }, index) => (
                  <div key={`${name}-${index}`} className="product-ingredient-card">
                    {imageUrl && (
                      <img
                        src={
                          imageUrl.startsWith("http")
                            ? imageUrl
                            : `${API_URL}${imageUrl}`
                        }
                        alt={name}
                        className="product-ingredient-image"
                      />
                    )}
                    <p className="product-ingredient-quantity">
                      {adjustedQuantity ? `${adjustedQuantity} ${unit || ""}` : ""}
                    </p>
                    <p className="product-ingredient-name">{name}</p>
                  </div>
                )
              )
            ) : (
              <p className="no-ingredients">
                Aucun ingrédient défini pour cette recette.
              </p>
            )}
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
            allComments.map((comment) => (
              <div key={comment._id || comment.id} className="comment-card">
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
