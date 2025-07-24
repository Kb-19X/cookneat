import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ recipeCount: 0, userCount: 0 });
  const [message, setMessage] = useState("");
  const [userInfo, setUserInfo] = useState({ username: "", email: "", role: "" });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    const headers = { Authorization: `Bearer ${token}` };

    const fetchUser = async () => {
      try {
        const res = await axios.get("https://cookneat-server.onrender.com/api/user/profile", { headers });
        setUserInfo(res.data);
      } catch (err) {
        console.error("❌ Erreur profil :", err.response?.data || err.message);
      }
    };

    const fetchRecipes = async () => {
      try {
        const res = await axios.get("https://cookneat-server.onrender.com/api/recipes");
        setRecipes(res.data);
      } catch (err) {
        console.error("❌ Erreur recettes :", err.response?.data || err.message);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://cookneat-server.onrender.com/api/user", { headers });
        setUsers(res.data);
      } catch (err) {
        console.error("❌ Erreur utilisateurs :", err.response?.data || err.message);
      }
    };

    const fetchStats = async () => {
      try {
        const res = await axios.get("https://cookneat-server.onrender.com/api/admin/stats", { headers });
        setStats(res.data);
      } catch (err) {
        console.error("❌ Erreur stats :", err.response?.data || err.message);
      }
    };

    fetchUser();
    fetchRecipes();
    fetchUsers();
    fetchStats();
  }, [token]);

  const handleDeleteRecipe = async (id) => {
    try {
      await axios.delete(`https://cookneat-server.onrender.com/api/recipes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecipes((prev) => prev.filter((r) => r._id !== id));
      setMessage("✅ Recette supprimée.");
    } catch (err) {
      console.error("❌ Erreur suppression recette :", err.response?.data || err.message);
    }
  };

  const handleEditRecipe = (id) => {
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
      console.error("❌ Erreur suppression utilisateur :", err.response?.data || err.message);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.put(
        `https://cookneat-server.onrender.com/api/user/${id}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role: newRole } : u))
      );
      setMessage("✅ Rôle mis à jour.");
    } catch (err) {
      console.error("❌ Erreur mise à jour rôle :", err.response?.data || err.message);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="left-panel">
        <h1>🧑‍💻 Dashboard Admin</h1>
        <p><strong>Nom :</strong> {userInfo.username}</p>
        <p><strong>Email :</strong> {userInfo.email}</p>
        <p><strong>Rôle :</strong> {userInfo.role}</p>
        <hr />
        <ul>
          <li>✅ Gestion des recettes</li>
          <li>🛠️ Gestion des utilisateurs</li>
          <li>📊 Statistiques globales</li>
        </ul>
        {message && <p className="admin-message">{message}</p>}
      </div>

      <div className="right-panel">
        <h2>📋 Recettes</h2>
        <div className="recipes-list">
          {recipes.map((r) => (
            <div className="recipe-card" key={r._id}>
              <h4>{r.title}</h4>
              <p>{r.description}</p>
              <button onClick={() => handleEditRecipe(r._id)}>✏️ Modifier</button>
              <button onClick={() => handleDeleteRecipe(r._id)}>🗑️ Supprimer</button>
            </div>
          ))}
        </div>

        <h2>👥 Utilisateurs</h2>
        <div className="recipes-list">
          {users.map((u) => (
            <div className="recipe-card" key={u._id}>
              <h4>{u.username}</h4>
              <p>{u.email}</p>
              <p><strong>Rôle :</strong> {u.role}</p>
              <select value={u.role} onChange={(e) => handleRoleChange(u._id, e.target.value)}>
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
              <button onClick={() => handleDeleteUser(u._id)}>🗑️ Supprimer</button>
            </div>
          ))}
        </div>

        <h2>📊 Statistiques</h2>
        <div className="stats-section">
          <p>Recettes : {stats.recipeCount}</p>
          <p>Utilisateurs : {stats.userCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
