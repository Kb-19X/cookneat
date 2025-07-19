import React, { useState, useMemo, useEffect } from "react";
import "./ProductDetails.css";
import axios from "axios";
import { IconButton, Tooltip } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { motion } from "framer-motion";

import burger from "../../assets/ImageHomePage/burger.jpg";
import lardonsImg from "../../assets/ImageHomePage/lardons.png";
import farineImg from "../../assets/ImageHomePage/farine.jpg";
import levureImg from "../../assets/ImageHomePage/levure.jpg";
import beurreImg from "../../assets/ImageHomePage/beurre.webp";
import tomateImg from "../../assets/ImageHomePage/tomate.jpg";
import jambonImg from "../../assets/ImageHomePage/jambon.jpg";
import oeufImg from "../../assets/ImageHomePage/oeufs.webp";
import huileImg from "../../assets/ImageHomePage/huile.jpg";

const ProductDetails = () => {
  const [liked, setLiked] = useState(false);
  const [personnes, setPersonnes] = useState(4);
  const [allComments, setAllComments] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const recipeId = "cake-sale-lardons";

  const tempsPreparation = 15;
  const tempsCuisson = 30;

  const recette = {
    image: burger,
    title: "Cake salé aux lardons",
    description: "Un cake moelleux, parfait pour un apéritif ou un repas léger.",
    steps: [
      "Préchauffer le four à 180°C.",
      "Mélanger la farine, la levure et les œufs.",
      "Ajouter les lardons, la tomate et le jambon.",
      "Verser dans un moule beurré.",
      "Cuire 30 min et laisser refroidir.",
    ],
  };

  const baseIngredients = [
    { name: "lardons en lamelles", quantity: 100, unit: "g", image: lardonsImg },
    { name: "farine", quantity: 200, unit: "g", image: farineImg },
    { name: "levure chimique", quantity: 1, unit: "sachet", image: levureImg },
    { name: "beurre pour le moule", quantity: 1, unit: "noisette", image: beurreImg },
    { name: "tomate coupée", quantity: 1, unit: "", image: tomateImg },
    { name: "dés de jambon", quantity: 100, unit: "g", image: jambonImg },
    { name: "œufs", quantity: 3, unit: "", image: oeufImg },
    { name: "huile d'olive", quantity: 7, unit: "cl", image: huileImg },
  ];

  const adjustedIngredients = useMemo(() => {
    return baseIngredients.map((ing) => ({
      ...ing,
      adjustedQuantity: (ing.quantity * personnes) / 4,
    }));
  }, [personnes]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recette.title,
        text: recette.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Lien copié dans le presse-papiers !");
    }
  };

  const incrementPersonnes = () => setPersonnes((p) => p + 1);
  const decrementPersonnes = () => setPersonnes((p) => (p > 1 ? p - 1 : 1));

  const fetchAllComments = async () => {
    try {
      const res = await axios.get("/api/comments");
      setAllComments(res.data);
    } catch (err) {
      console.error("Erreur chargement commentaires :", err);
    }
  };

  const fetchAllRecipes = async () => {
    try {
      const res = await axios.get("/api/recipes");
      setRecipes(res.data);
    } catch (err) {
      console.error("Erreur chargement recettes :", err);
    }
  };

  useEffect(() => {
    fetchAllComments();
    fetchAllRecipes();
  }, []);

  return (
    <div className="background-product">
      <div className="recette-page">
        <img src={recette.image} alt={recette.title} className="recette-img" />
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

        <motion.div className="product-ingredients" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="product-ingredients-header">
            <h2>Ingrédients</h2>
            <div className="product-personnes-control">
              <button onClick={decrementPersonnes}>−</button>
              <span>{personnes} personnes</span>
              <button onClick={incrementPersonnes}>+</button>
            </div>
          </div>

          <div className="product-time">
            <p><AccessTimeIcon fontSize="small" /> <strong>Préparation :</strong> {tempsPreparation} min</p>
            <p><AccessTimeIcon fontSize="small" /> <strong>Cuisson :</strong> {tempsCuisson} min</p>
            <p><AccessTimeIcon fontSize="small" /> <strong>Total :</strong> {tempsPreparation + tempsCuisson} min</p>
          </div>

          <div className="product-ingredients-grid">
            {adjustedIngredients.map((item, i) => (
              <motion.div className="product-ingredient-card" key={i} whileHover={{ scale: 1.05 }}>
                <img src={item.image} alt={item.name} />
                <p className="product-ingredient-quantity">
                  <strong>{item.adjustedQuantity} {item.unit}</strong>
                </p>
                <p className="product-ingredient-name">de {item.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="product-preparation-section" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <h2 className="product-preparation-title">Préparation</h2>
          {recette.steps.map((step, i) => (
            <div key={i} className="preparation-step">
              <h3 className="preparation-step-title">Étape {i + 1}</h3>
              <p className="preparation-step-text">{step}</p>
            </div>
          ))}
        </motion.div>

        {/* SECTION COMMENTAIRES GLOBALE */}
        <div id="commentaires" className="all-comments-section">
          <h2 className="plats-commentez">🗣️ Derniers commentaires</h2>
          {allComments.length > 0 ? (
            allComments.slice(0, 10).map((comment) => {
              const recipe = recipes.find((r) => r._id === comment.recipeId);
              return (
                <div key={comment._id} className="comment-card">
                  <p>
                    <strong>{comment.name}</strong> sur{" "}
                    <em>{recipe?.title || "Recette inconnue"}</em> :
                  </p>
                  <p>{comment.text}</p>
                  <p>⭐ {comment.rating} / 5</p>
                </div>
              );
            })
          ) : (
            <p>Aucun commentaire pour le moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
