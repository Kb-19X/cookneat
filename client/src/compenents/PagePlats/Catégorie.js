import "./Catégorie.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../Pagination/Pagination";

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
  const [filters, setFilters] = useState({ category: "", ingredient: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
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
        "Erreur lors du like : " + (err.response?.data?.message || err.message)
      );
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setCurrentPage(1); // reset page à 1 à chaque filtre
  };

  const rapideFacile = recipes.filter((r) => {
    const totalTime = parseInt(r.totalTime) || 0;
    return totalTime <= 20 && (r.difficulty === "facile" || !r.difficulty);
  });

  const filteredRecipes = rapideFacile
    .filter((recipe) =>
      recipe.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((recipe) =>
      !filters.category
        ? true
        : recipe.category?.toLowerCase() === filters.category.toLowerCase()
    )
    .filter((recipe) =>
      !filters.ingredient
        ? true
        : recipe.ingredients?.some((i) =>
            i.name.toLowerCase().includes(filters.ingredient.toLowerCase())
          )
    );

  // Pagination
  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // remonte en haut de page
  };

  return (
    <div className="plats-body-container">
      <div className="background-cover">
        <div className="banner-container">
          <div className="banner-left">
            <img src={plat} alt="fruits et légumes" />
            <div className="banner-overlay-heal">
              <h1>Rapide & Facile</h1>
              <p>
                <strong>Des recettes</strong> <em>express</em>, <strong>sans stress.</strong>
              </p>
            </div>
          </div>
          <div className="banner-right">
            <h2>
              Des recettes rapides et faciles à préparer, idéales pour tous les jours !
            </h2>
            <p>
              "Des saveurs venues d’ailleurs pour éveiller vos sens :{" "}
              <span className="mot-color">embarquez</span> pour un tour du monde culinaire sans quitter votre cuisine."
            </p>
          </div>
        </div>
      </div>

      <div className="rapide-header-section">
        <div className="rapide-text">
          <h1>⚡ Recettes Rapides & Faciles ⚡</h1>
          <p>
            Moins de 20 minutes, zéro stress, 100% goût. Ces plats sont parfaits pour les étudiants pressés, les familles débordées ou les gourmands impatients.
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

      <div className="filters-container">
        <div className="filter-group">
          <label>Catégorie :</label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            <option value="" className="all-recipes-color">Toutes les recettes</option>
            <option value="Rapide & facile">Rapide & facile</option>
            <option value="Healthy">Healthy</option>
            <option value="Confort food">Confort food</option>
            <option value="Saveurs du monde">Saveurs du monde</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Ingrédient :</label>
          <input
            className="filter-ingredient"
            type="text"
            placeholder="Ex: poulet"
            value={filters.ingredient}
            onChange={(e) => handleFilterChange("ingredient", e.target.value)}
          />
        </div>
      </div>

      <div className="recipes-list">
        {currentRecipes.length > 0 ? (
          currentRecipes.map((recipe) => (
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

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Catégorie;
