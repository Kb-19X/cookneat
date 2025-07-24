import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [message, setMessage] = useState("");
  const [userInfo, setUserInfo] = useState({ email: "", role: "" });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // 🔐 Charger les infos utilisateur
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "https://cookneat-server.onrender.com/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserInfo(res.data);
      } catch (err) {
        console.error("❌ Erreur profil :", err);
      }
    };

    fetchUser();
  }, [token]);

  // 📦 Charger toutes les recettes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get("https://cookneat-server.onrender.com/api/recipes");
        setRecipes(res.data);
      } catch (err) {
        console.error("❌ Erreur chargement recettes :", err);
      }
    };

    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://cookneat-server.onrender.com/api/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecipes((prev) => prev.filter((r) => r._id !== id));
      setMessage("✅ Recette supprimée.");
    } catch (err) {
      console.error("❌ Erreur suppression :", err);
      setMessage("❌ Échec de la suppression.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/EditRecipe/${id}`);
  };

  return (
    <div className="dashboard-page">
      <h1>🎛️ Dashboard Admin</h1>
      <p>Bienvenue !</p>

      <div className="admin-info">
        <strong>Email :</strong> {userInfo.email}
        <br />
        <strong>Rôle :</strong> {userInfo.role}
      </div>

      <div className="admin-actions">
        <p>✅ Voir toutes les recettes</p>
        <p>🛠️ Supprimer un utilisateur</p>
        <p>📊 Statistiques globales</p>
      </div>

      {message && <p className="admin-message">{message}</p>}

      <h2>📋 Toutes les recettes</h2>
      <div className="recipes-list">
        {recipes.map((recipe) => (
          <div className="recipe-card" key={recipe._id}>
            <h4>{recipe.title}</h4>
            <p className="truncate">{recipe.description}</p>
            <div className="card-actions">
              <button onClick={() => handleEdit(recipe._id)}>✏️ Modifier</button>
              <button onClick={() => handleDelete(recipe._id)}>🗑️ Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
