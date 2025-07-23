import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const API_URL = process.env.REACT_APP_API_URL || 'https://cookneat-server.onrender.com';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('⚠️ Aucun token trouvé');
      return navigate('/login');
    }

    const checkAdmin = async () => {
      try {
        const res = await axios.get(`${API_URL}/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.data.user) {
          console.error('❌ Données utilisateur absentes dans la réponse :', res.data);
          return navigate('/login');
        }

        const { role } = res.data.user;

        if (role !== 'admin') {
          console.warn('❌ Accès refusé : rôle non admin');
          return navigate('/login');
        }

        setUserData(res.data.user);
      } catch (err) {
        console.error('⛔ Erreur pendant la vérification admin :', err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          navigate('/login');
        } else {
          alert('Erreur serveur');
        }
      }
    };

    checkAdmin();
  }, [navigate]);

  if (!userData) return <p>Chargement du dashboard...</p>;

  return (
    <div className="admin-dashboard">
      <h1>🎛️ Dashboard Admin</h1>
      <p>Bienvenue {userData.name || userData.username} !</p>
      <p>Email : {userData.email}</p>
      <p>Rôle : {userData.role}</p>

      <ul>
        <li>✅ Voir toutes les recettes</li>
        <li>🛠️ Supprimer un utilisateur</li>
        <li>📊 Statistiques globales</li>
      </ul>
    </div>
  );
};

export default Dashboard;
