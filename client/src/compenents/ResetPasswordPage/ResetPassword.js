// ResetPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../ForgetPasswordPage/Forgetmdp.css'; 
import logo from '../../assets/ImageHomePage/logo.png';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || "https://cookneat-server.onrender.com";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification des champs
    if (!password || !confirmPassword) {
      setError("Veuillez remplir tous les champs.");
      setMessage('');
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setMessage('');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await axios.post(`${API_URL}/api/auth/reset-password/${token}`, { password });

      setMessage(res.data.message || "Votre mot de passe a été réinitialisé avec succès.");
      setPassword('');
      setConfirmPassword('');

      // Redirection après 3 secondes vers la page de connexion
      setTimeout(() => {
        navigate('/connexion');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Forgetmdp-background">
      <a href="/"><img src={logo} alt="Logo CookNeat" /></a>
      <div className="forget-container">
        <h1>Réinitialisation du mot de passe</h1>
        <p>Saisissez votre nouveau mot de passe ci-dessous.</p>
        <form className="input-forget" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
          />
          <button type="submit" className="btn-forget-password" disabled={loading}>
            {loading ? "Réinitialisation..." : "Valider"}
          </button>
        </form>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
