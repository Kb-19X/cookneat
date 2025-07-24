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

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (!token) return;

    const fetchAll = async () => {
      try {
        const [userRes, recipesRes, usersRes, statsRes] = await Promise.all([
          axios.get("https://cookneat-server.onrender.com/api/user/profile", { headers }),
          axios.get("https://cookneat-server.onrender.com/api/recipes"),
          axios.get("https://cookneat-server.onrender.com/api/user", { headers }),
          axios.get("https://cookneat-server.onrender.com/api/admin/stats", { headers }),
        ]);

        setUserInfo(userRes.data);
        setRecipes(recipesRes.data);
        setUsers(usersRes.data);
        setStats(statsRes.data);
      } catch (err) {
        console.error("❌ Dashboard error:", err.response?.data || err.message);
      }
    };

    fetchAll();
  }, [token]);

  const handleEditRecipe = (id) => navigate(`/EditRecipe/${id}`);

  const handleDeleteRecipe = async (id) => {
    try {
      await axios.delete(`https://cookneat-server.onrender.com/api/recipes/${id}`, { headers });
      setRecipes(recipes.filter((r) => r._id !== id));
      setMessage("✅ Recette supprimée.");
    } catch (err) {
      console.error("❌ Suppression recette:", err);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`https://cookneat-server.onrender.com/api/user/${id}`, { headers });
      setUsers(users.filter((u) => u._id !== id));
      setMessage("✅ Utilisateur supprimé.");
    } catch (err) {
      console.error("❌ Suppression utilisateur:", err);
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      await axios.put(`https://cookneat-server.onrender.com/api/user/${id}/role`, { role }, { headers });
      setUsers(users.map((u) => (u._id === id ? { ...u, role } : u)));
      setMessage("✅ Rôle mis à jour.");
    } catch (err) {
      console.error("❌ Changement rôle:", err);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="left-panel">
        <h1>🧑‍💻 Dashboard Admin</h1>
        <p><strong>Nom :</strong> {userInfo.username || "—"}</p>
        <p><strong>Email :</strong> {userInfo.email || "—"}</p>
        <p><strong>Rôle :</strong> {userInfo.role || "—"}</p>
        <hr />
        <ul>
          <li>✅ Gestion des recettes</li>
          <li>🛠️ Gestion des utilisateurs</li>
          <li>📊 Statistiques globales</li>
        </ul>
        {message && <p className="admin-message">{message}</p>}
      </div>

      <div className="right-panel">
        <section>
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
        </section>

        <section>
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
        </section>

        <section>
          <h2>📊 Statistiques</h2>
          <div className="stats-section">
            <p>Total recettes : {stats.recipeCount}</p>
            <p>Total utilisateurs : {stats.userCount}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
