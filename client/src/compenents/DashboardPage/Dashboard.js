import React, { useEffect, useState } from "react";
import {
  getProfile,
  getRecettes,
  deleteRecette,
  getUsers,
  deleteUser,
  changeUserRole,
  getStats,
} from "../../api";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ recipeCount: 0, userCount: 0 });
  const [message, setMessage] = useState("");
  const [userInfo, setUserInfo] = useState({ email: "", role: "", username: "" });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchAll = async () => {
      try {
        const profileRes = await getProfile();
        setUserInfo(profileRes.data);

        const recettesRes = await getRecettes();
        setRecipes(recettesRes.data);

        const usersRes = await getUsers();
        setUsers(usersRes.data);

        const statsRes = await getStats();
        setStats(statsRes.data);
      } catch (error) {
        console.error("❌ Erreur lors du chargement des données :", error);
      }
    };

    fetchAll();
  }, [token, navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Confirmez-vous la suppression de cette recette ?")) return;
    try {
      await deleteRecette(id);
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
    if (!window.confirm("Confirmez-vous la suppression de cet utilisateur ?")) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      setMessage("✅ Utilisateur supprimé.");
    } catch (err) {
      console.error("❌ Erreur suppression utilisateur :", err);
      setMessage("❌ Échec de la suppression.");
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await changeUserRole(userId, newRole);
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );
      setMessage("✅ Rôle mis à jour.");
    } catch (err) {
      console.error("❌ Erreur mise à jour rôle :", err);
      setMessage("❌ Échec du changement de rôle.");
    }
  };

  return (
    <div className="dashboard-page">
      <div className="left-panel">
        <h1>🎛️ Dashboard Admin</h1>
        <p>Bienvenue !</p>
        <div className="admin-info">
          <p><strong>Nom :</strong> {userInfo.username}</p>
          <p><strong>Email :</strong> {userInfo.email}</p>
          <p><strong>Rôle :</strong> {userInfo.role}</p>
        </div>

        <div className="admin-actions">
          <h3>Fonctionnalités :</h3>
          <ul>
            <li>✅ Voir toutes les recettes</li>
            <li>🛠️ Supprimer un utilisateur</li>
            <li>📊 Statistiques globales</li>
          </ul>
        </div>

        {message && <p className="admin-message">{message}</p>}
      </div>

      <div className="right-panel">
        <h2>📋 Toutes les recettes</h2>
        <div className="recipes-list-dash">
          {recipes.length === 0 && <p>Aucune recette trouvée.</p>}
          {recipes.map((recipe) => (
            <div className="recipe-card-dash" key={recipe._id}>
              <h4>{recipe.title}</h4>
              <p className="truncate">{recipe.description}</p>
              <div className="card-actions">
                <button onClick={() => handleEdit(recipe._id)}> Modifier</button>
                <button onClick={() => handleDelete(recipe._id) }  className="supp-user-dash">Supprimer</button>
              </div>
            </div>
          ))}
        </div>

        <h2>👥 Liste des utilisateurs</h2>
        <div className="recipes-list-dash">
          {users.length === 0 && <p>Aucun utilisateur trouvé.</p>}
          {users.map((user) => (
            <div className="recipe-card-dash" key={user._id}>
              <h4>{user.username || user.name}</h4>
              <p>{user.email}</p>
              <p><strong>Rôle :</strong> {user.role}</p>

              <div className="role-buttons">
                <button
                  className={user.role === "user" ? "active" : ""}
                  onClick={() => handleRoleChange(user._id, "user")}
                >
                User
                </button>
                <button
                  className={user.role === "admin" ? "active" : ""}
                  onClick={() => handleRoleChange(user._id, "admin")}
                >
             Admin
                </button>
              </div>

              <button onClick={() => handleDeleteUser(user._id)} className="supp-user-dash"> Supprimer</button>
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
