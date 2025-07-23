import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const API_URL = process.env.REACT_APP_API_URL || 'https://cookneat-server.onrender.com';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('⚠️ Aucun token trouvé');
      navigate('/login');
      return;
    }

    const checkAdmin = async () => {
      try {
        console.log("📡 Appel vers :", `${API_URL}/admin/dashboard`);
        const res = await axios.get(`${API_URL}/admin/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = res.data.user;

        if (!user || user.role !== 'admin') {
          console.warn('⛔ Utilisateur non autorisé');
          navigate('/login');
          return;
        }

        setUserData(user);
      } catch (err) {
        console.error('❌ Erreur axios :', err);

        if (err.response) {
          console.error('📨 Erreur backend :', err.response.data);
          const status = err.response.status;

          if (status === 401 || status === 403) {
            navigate('/login');
          } else {
            setError(`Erreur serveur (${status}) : ${err.response.data.message || 'inconnue'}`);
          }
        } else {
          setError("Erreur réseau : le serveur est peut-être injoignable.");
        }
      }
    };

    checkAdmin();
  }, [navigate]);

  if (error) {
    return <div className="admin-dashboard-error">{error}</div>;
  }

  if (!userData) {
    return <p>Chargement du dashboard...</p>;
  }

  return (
    <div className="admin-dashboard">
      <h1>🎛️ Dashboard Admin</h1>
      <p>Bienvenue {userData.username || userData.name} !</p>
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
