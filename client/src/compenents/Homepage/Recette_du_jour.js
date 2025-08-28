import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Recette_du_jour.css";
import tool from "../../assets/ImageHomePage/tool.png";

const Recette_du_jour = () => {
  const [recipe, setRecipe] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL || "https://cookneat-server.onrender.com";
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setUser({ id: decoded.id, name: decoded.name, token });
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  useEffect(() => {
    const fetchRecipeOfTheDay = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/recipes`);
        const recipes = res.data;
        if (recipes.length > 0) {
          const day = new Date().getDate();
          const index = day % recipes.length;
          setRecipe(recipes[index]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipeOfTheDay();
  }, [API_URL]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Chargement de la recette du jour...</p>
      </div>
    );
  }

  if (!recipe) return <p>Aucune recette disponible pour le moment.</p>;

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
          <img
            src={recipe.imageUrl.startsWith("http") ? recipe.imageUrl : `${API_URL}${recipe.imageUrl}`}
            alt={recipe.title}
            className="clickable-image"
            onClick={() => navigate(`/productpage/${recipe._id}`)}
          />
          <h1>{recipe.title}</h1>
        </div>

        <div className="recetteday-right">
          <p className="titre-recetteday-2">
            Plongez dans les saveurs de cette recette du jour !
          </p>
          <p className="recette-description">
            {recipe.description || "Découvrez comment préparer un plat savoureux en quelques étapes simples. Bon appétit !"}
          </p>

          <div
            className="recipe-info-box"
            onClick={() => navigate(`/productpage/${recipe._id}`)}
          >
            <p><strong>Préparation :</strong> {recipe.prepTime || "10 min"}</p>
            <p><strong>Cuisson :</strong> {recipe.cookTime || "15 min"}</p>
            <p><strong>Total :</strong> {recipe.totalTime || "25 min"}</p>
            <p className="click-to-view"> Voir la recette complète</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recette_du_jour;
