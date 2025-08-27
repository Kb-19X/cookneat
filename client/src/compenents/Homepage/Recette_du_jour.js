import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Recette_du_jour.css";

import tool from "../../assets/ImageHomePage/tool.png";

const Recette_du_jour = () => {
  const [recipe, setRecipe] = useState(null);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);
 
  const [user, setUser] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || "https://cookneat-server.onrender.com";

  // Récupération de l'utilisateur depuis le token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setUser({ id: decoded.id, name: decoded.name, token });
      } catch (err) {
        console.error("❌ Token invalide :", err);
      }
    }
  }, []);

  // Récupération de toutes les recettes et calcul de la recette du jour
  useEffect(() => {
    const fetchRecipeOfTheDay = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/recipes`);
        const recipes = res.data;

        if (recipes.length > 0) {
          const day = new Date().getDate(); // numéro du jour du mois
          const index = day % recipes.length; // change chaque jour
          setRecipe(recipes[index]);
          loadComments(recipes[index]._id);
        }
      } catch (err) {
        console.error("❌ Erreur récupération recettes :", err);
      }
    };

    fetchRecipeOfTheDay();
  }, [API_URL]);

  // Chargement des commentaires pour une recette donnée
  const loadComments = (recipeId) => {
    axios
      .get(`${API_URL}/api/comments?recipeId=${recipeId}`)
  
      .catch((err) => console.error("❌ Erreur chargement commentaires :", err));
  };

  if (!recipe) return <p>Chargement de la recette du jour...</p>;

  return (
    <div className="pagejour">
      <div className="description-pagejour">
        <p className="pagejour-texte">
          "Découvrez chaque jour des recettes savoureuses et faciles à réaliser pour régaler vos proches !"
        </p>
      </div>

      <div className="recettedujour">
        <img src={tool} alt="outil" />
        <h1 className="titre-recetteday">👨‍🍳 Inspiration du jour : {recipe.title}</h1>
        <img src={tool} alt="outil" />
      </div>

      <div className="recetteday-container">
        <div className="recetteday-left">
          <img src={recipe.imageUrl.startsWith("http") ? recipe.imageUrl : `${API_URL}${recipe.imageUrl}`} alt={recipe.title} />
          <h1>{recipe.title}</h1>
        </div>

        <div className="recetteday-right">
          <p className="titre-recetteday-2">
            Plongez dans les saveurs de cette recette du jour !
          </p>
          <p style={{ fontSize: "18px", marginTop: "10px", color: "#555" }}>
            {recipe.description || "Découvrez comment préparer un plat savoureux en quelques étapes simples. Bon appétit !"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Recette_du_jour;
