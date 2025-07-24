import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ recipeCount: 0, userCount: 0 });
  const [userInfo, setUserInfo] = useState({});
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // ✅ Requêtes backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, recipesRes, usersRes, statsRes] = await Promise.all([
          axios.get("https://cookneat-server.onrender.com/api/user/profile", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://cookneat-server.onrender.com/api/recipes"),
          axios.get("https://cookneat-server.onrender.com/api/user", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://cookneat-server.onrender.com/api/admin/stats", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUserInfo(profileRes.data);
        setRecipes(recipesRes.data);
        setUsers(usersRes.data);
        setStats(statsRes.data);
      } catch (err) {
        console.error("Erreur initialisation dashboard :", err.response?.data || err.message);
      }
    };

    if (token) fetchData();
  }, [token]);

  // ✅ Supprimer une recette
  const handleDeleteRecipe = async (id) => {
    try {
      await axios.delete(`https://cookneat-server.onrender.com/api/recipes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecipes((prev) => prev.filter((r) => r._id !== id));
      setMessage("✅ Recette supprimée.");
    } catch (err) {
      console.error("Erreur suppression recette :", err);
    }
  };

  // ✅ Modifier une recette
  const handleEditRecipe = (id) => {
    navigate(`/EditRecipe/${id}`);
  };

  // ✅ Supprimer un utilisateur
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`https://cookneat-server.onrender.com/api/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) => prev.filter((u) => u._id !== id));
      setMessage("✅ Utilisateur supprimé.");
    } catch (err) {
      console.error("Erreur suppression utilisateur :", err);
    }
  };

  // ✅ Changer le rôle d’un utilisateur
  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(
        `https://cookneat-server.onrender.com/api/user/${userId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );
      setMessage("✅ Rôle mis à jour.");
    } catch (err) {
      console.error("Erreur rôle utilisateur :", err);
    }
  };

  // ✅ Obtenir les derniers commentaires d’un utilisateur
  const fetchUserComments = async (userId) => {
    try {
      const res = await axios.get(`https://cookneat-server.onrender.com/api/comments/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      console.error("Erreur chargement commentaires utilisateur :", err);
      return [];
    }
  };

  return (
    <div className="dashboard-page">
      {/* Panel gauche : info admin */}
      <div className="left-panel">
        <h1>🎛️ Dashboard Admin</h1>
        <div className="admin-info">
          <p><strong>Nom :</strong> {userInfo.username}</p>
          <p><strong>Email :</strong> {userInfo.email}</p>
          <p><strong>Rôle :</strong> {userInfo.role}</p>
        </div>

        <div className="admin-actions">
          <p>✅ Gestion des recettes</p>
          <p>🛠️ Gestion des utilisateurs</p>
          <p>📊 Statistiques globales</p>
        </div>

        {message && <p className="admin-message">{message}</p>}
      </div>

      {/* Panel droit */}
      <div className="right-panel">

        {/* Recettes */}
        <h2>📋 Recettes</h2>
        <div className="recipes-list">
          {recipes.map((recipe) => (
            <div className="recipe-card" key={recipe._id}>
              <h4>{recipe.title}</h4>
              <p className="truncate">{recipe.description}</p>
              <div className="card-actions">
                <button onClick={() => handleEditRecipe(recipe._id)}>✏️ Modifier</button>
                <button onClick={() => handleDeleteRecipe(recipe._id)}>🗑️ Supprimer</button>
              </div>
            </div>
          ))}
        </div>

        {/* Utilisateurs */}
        <h2>👥 Utilisateurs</h2>
        <div className="recipes-list">
          {users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              onDelete={handleDeleteUser}
              onRoleChange={handleRoleChange}
              fetchUserComments={fetchUserComments}
            />
          ))}
        </div>

        {/* Statistiques */}
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

// 🔧 Sous-composant utilisateur (modulaire)
const UserCard = ({ user, onDelete, onRoleChange, fetchUserComments }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const toggleComments = async () => {
    if (!showComments) {
      const userComments = await fetchUserComments(user._id);
      setComments(userComments);
    }
    setShowComments(!showComments);
  };

  return (
    <div className="recipe-card">
      <h4>{user.username}</h4>
      <p>{user.email}</p>
      <p><strong>Rôle :</strong> {user.role}</p>

      <select
        value={user.role}
        onChange={(e) => onRoleChange(user._id, e.target.value)}
      >
        <option value="user">user</option>
        <option value="admin">admin</option>
      </select>

      <button onClick={() => onDelete(user._id)}>🗑️ Supprimer</button>
      <button onClick={toggleComments}>
        {showComments ? "🔽 Masquer commentaires" : "💬 Voir commentaires"}
      </button>

      {showComments && comments.length > 0 && (
        <div className="user-comments">
          <ul>
            {comments.map((c) => (
              <li key={c._id}>
                <strong>{c.recipeTitle} :</strong> {c.text}
              </li>
            ))}
          </ul>
        </div>
      )}
      {showComments && comments.length === 0 && <p>Aucun commentaire.</p>}
    </div>
  );
};
