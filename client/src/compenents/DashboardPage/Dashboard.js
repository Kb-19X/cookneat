import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ recipeCount: 0, userCount: 0 });
  const [message, setMessage] = useState("");
  const [userInfo, setUserInfo] = useState({ email: "", role: "" });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://cookneat-server.onrender.com/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserInfo(res.data);
      } catch (err) {
        console.error("❌ Erreur profil :", err);
      }
    };

    const fetchRecipes = async () => {
      try {
        const res = await axios.get("https://cookneat-server.onrender.com/api/recipes");
        setRecipes(res.data);
      } catch (err) {
        console.error("❌ Erreur recettes :", err);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://cookneat-server.onrender.com/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("❌ Erreur utilisateurs :", err);
      }
    };

    const fetchStats = async () => {
      try {
        const res = await axios.get("https://cookneat-server.onrender.com/api/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error("❌ Erreur stats :", err);
      }
    };

    fetchUser();
    fetchRecipes();
    fetchUsers();
    fetchStats();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://cookneat-server.onrender.com/api/recipes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecipes((prev) => prev.filter((r) => r._id !== id));
      setMessage("✅ Recette supprimée.");
    } catch (err) {
      console.error("❌ Erreur suppression recette :", err);
      setMessage("❌ Échec de la suppression.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/EditRecipe/${id}`);
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`https://cookneat-server.onrender.com/api/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) => prev.filter((u) => u._id !== id));
      setMessage("✅ Utilisateur supprimé.");
    } catch (err) {
      console.error("❌ Erreur suppression utilisateur :", err);
      setMessage("❌ Échec de la suppression.");
    }
  };

  return (
    <div className="dashboard-page">
      <div className="left-panel">
        <h1>🎛️ Dashboard Admin</h1>
        <p>Bienvenue !</p>
        <div className="admin-info">
          <strong>Email :</strong> {userInfo.email}<br />
          <strong>Rôle :</strong> {userInfo.role}
        </div>
        <div className="admin-actions">
          <p>✅ Voir toutes les recettes</p>
          <p>🛠️ Supprimer un utilisateur</p>
          <p>📊 Statistiques globales</p>
        </div>
        {message && <p className="admin-message">{message}</p>}
      </div>

      <div className="right-panel">
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

        <h2>👥 Liste des utilisateurs</h2>
        <div className="recipes-list">
          {users.map((user) => (
            <div className="recipe-card" key={user._id}>
              <h4>{user.name}</h4>
              <p>{user.email}</p>
              <button onClick={() => handleDeleteUser(user._id)}>🗑️ Supprimer</button>
            </div>
          ))}
        </div>

        <h2>📊 Statistiques globales</h2>
        <div className="stats-section">
          <p>Recettes totales : {stats.recipeCount}</p>
          <p>Utilisateurs totaux : {stats.userCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
