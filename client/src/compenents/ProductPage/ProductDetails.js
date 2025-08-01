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

        console.log("✅ Donnée reçue pour la recette :", recipe);

        // Nettoyage des étapes : on récupère step.description
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
        // Récupérer uniquement les commentaires liés à cette recette
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

  // Ajustement des quantités pour les ingrédients (basé sur quantité initiale * personnes / 4)
  const adjustedIngredients = useMemo(() => {
    if (!recette?.ingredients || recette.ingredients.length === 0) return [];

    // recette.ingredients est un tableau d'objets { name, quantity }
    return recette.ingredients.map(({ name, quantity }) => {
      // eslint-disable-next-line no-useless-escape
 // eslint-disable-next-line no-useless-escape
      const regex = /^([\d.,\/]+)?\s*([^\d\s]+)?$/; // ex: "2 tranches", "50 g", "à goût"
      const match = quantity ? quantity.match(regex) : null;

      let number = 0;
      let unit = "";
      if (match) {
        let rawNumber = match[1] || "";
        // Gérer les fractions (ex: "1/2")
        if (rawNumber.includes("/")) {
          const parts = rawNumber.split("/");
          if (parts.length === 2)
            number = parseFloat(parts[0]) / parseFloat(parts[1]);
        } else {
          number = parseFloat(rawNumber.replace(",", "."));
        }
        unit = match[2] || "";
      } else {
        unit = "";
      }

      // Si pas de nombre, on ne modifie pas la quantité
      if (!number || isNaN(number)) {
        return { name, quantity, adjustedQuantity: quantity, unit };
      }

      // Calcul ajusté, on garde 1 décimale et supprime si .0
      let adjustedQty = ((number * personnes) / 4).toFixed(1);
      if (adjustedQty.endsWith(".0")) adjustedQty = adjustedQty.slice(0, -2);

      return {
        name,
        quantity,
        adjustedQuantity: adjustedQty,
        unit,
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
              <span>{personnes} personne{personnes > 1 ? "s" : ""}</span>
              <button onClick={incrementPersonnes}>+</button>
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

    <div className="product-ingredients-section">
      <h2 className="product-ingredients-title">Ingrédients</h2>
      {recette.ingredients && recette.ingredients.length > 0 ? (
        recette.ingredients.map((ingredient, i) => (
          <div key={i} className="ingredient-step">
            <h3 className="ingredient-step-title">Ingrédient {i + 1}</h3>
            <p className="ingredient-step-text">{ingredient.description}</p>
          </div>
        ))
      ) : (
        <p className="no-ingredients">Aucun ingrédient défini pour cette recette.</p>
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
