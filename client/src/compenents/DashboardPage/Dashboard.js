import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css'
const API_URL = process.env.REACT_APP_API_URL || 'https://cookneat-server.onrender.com';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    const checkAdmin = async () => {
      try {
        const res = await axios.get(`${API_URL}/admin/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(res.data.user);
      } catch (err) {
        console.error('⛔ Accès interdit :', err);
        navigate('/login');
      }
    };

    checkAdmin();
  }, [navigate]);

  if (!userData) return <p>Chargement du dashboard...</p>;

  return (
    <div className="admin-dashboard">
      <h1>🎛️ Dashboard Admin</h1>
      <p>Bienvenue {userData.name} !</p>
      <p>Rôle : {userData.role}</p>

      {/* Ajoute ici des outils d'administration : */}
      <ul>
        <li>✅ Voir toutes les recettes</li>
        <li>🛠️ Supprimer un utilisateur</li>
        <li>📊 Statistiques globales</li>
        {/* etc. */}
      </ul>
    </div>
  );
};

export default Dashboard;
