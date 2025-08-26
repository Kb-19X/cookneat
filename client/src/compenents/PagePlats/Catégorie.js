import "./Catégorie.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import commentIcon from "../../assets/ImagePlatsPage/comment.png";
import likeIcon from "../../assets/ImagePlatsPage/like.png";
import shareIcon from "../../assets/ImagePlatsPage/share.png";
import plat from "../../assets/ImageHomePage/plat.jpg";

const API_URL =
  process.env.REACT_APP_API_URL || "https://cookneat-server.onrender.com";

const Catégorie = () => {
  const [recipes, setRecipes] = useState([]);
  const [likes, setLikes] = useState({});
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/recipes`);
        setRecipes(res.data);

        const initialLikes = {};
        res.data.forEach((r) => {
          initialLikes[r._id] = r.likes?.length || 0;
        });
        setLikes(initialLikes);
      } catch (err) {
        console.error("❌ Erreur lors de la récupération des recettes :", err);
      }
    };
    fetchRecipes();
  }, []);

  const handleLike = async (recipeId, e) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Vous devez être connecté pour liker.");
        return;
      }

      const res = await axios.post(
        `${API_URL}/api/recipes/${recipeId}/like`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.likes) {
        setLikes((prev) => ({ ...prev, [recipeId]: res.data.likes.length }));
      } else if (typeof res.data.likesCount === "number") {
        setLikes((prev) => ({ ...prev, [recipeId]: res.data.likesCount }));
      } else {
        setLikes((prev) => ({
          ...prev,
          [recipeId]: (prev[recipeId] || 0) + 1,
        }));
      }
    } catch (err) {
      console.error("Erreur lors du like :", err.response?.data || err.message);
      alert(
        "Erreur lors du like : " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  const rapideFacile = recipes.filter((r) => {
    const totalTime = parseInt(r.totalTime) || 0;
    return totalTime <= 20 && (r.difficulty === "facile" || !r.difficulty);
  });

  const filteredRecipes = rapideFacile.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="plats-body-container">
      <div className="background-cover">
        <div className="banner-container">
          <div className="banner-left">
            <img src={plat} alt="fruits et légumes" />
            <div className="banner-overlay-heal">
              <h1>Rapide & Facile</h1>
              <p>
                <strong>Des recettes</strong> <em>express</em>,{" "}
                <strong>sans stress.</strong>
              </p>
            </div>
          </div>
          <div className="banner-right">
            <h2>
              Des recettes rapides et faciles à préparer, idéales pour tous les
              jours !
            </h2>
            <p>
              "Des saveurs venues d’ailleurs pour éveiller vos sens :{" "}
              <span className="mot-color">embarquez</span> pour un tour du
              monde culinaire sans quitter votre cuisine."
            </p>
          </div>
        </div>
      </div>

      <div className="rapide-header-section">
        <div className="rapide-text">
          <h1>⚡ Recettes Rapides & Faciles ⚡</h1>
          <p>
            Moins de 20 minutes, zéro stress, 100% goût. Ces plats sont parfaits
            pour les étudiants pressés, les familles débordées ou les gourmands
            impatients.
          </p>
          <div className="rapide-benefits">
            <div className="benefit-box">⏱️ Prêtes en 20 min</div>
            <div className="benefit-box">👨‍🍳 Simples à réaliser</div>
            <div className="benefit-box">💡 Ingrédients faciles à trouver</div>
          </div>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher un plat..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="recipes-list">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div key={recipe._id} className="recipe-card">
              <Link
                to={`/productpage/${recipe._id}`}
                className="recipe-image-link"
                style={{ display: "block" }}
              >
                <div className="recipe-image">
                  <img
                    src={
                      recipe.imageUrl?.startsWith("http")
                        ? recipe.imageUrl
                        : `${API_URL}${recipe.imageUrl}`
                    }
                    alt={recipe.title}
                  />
                </div>
              </Link>

              <div className="recipe-info">
                <h3>{recipe.title}</h3>
                <p className="recipe-time">
                  ⏱️ Préparation : {recipe.prepTime || "10 min"} <br />
                  🔥 Cuisson : {recipe.cookTime || "15 min"} <br />
                  ⏳ Total : {recipe.totalTime || "25 min"}
                </p>
                {recipe.description && (
                  <p className="recipe-description">{recipe.description}</p>
                )}

                <div className="recipe-actions">
                  <img
                    src={likeIcon}
                    alt="Like"
                    onClick={(e) => handleLike(recipe._id, e)}
                    style={{ cursor: "pointer" }}
                  />
                  <img
                    src={commentIcon}
                    alt="Comment"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate(`/productpage/${recipe._id}#commentaires`)
                    }
                  />
                  <img src={shareIcon} alt="Share" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Aucune recette trouvée.</p>
        )}
      </div>
    </div>
  );
};

export default Catégorie;
