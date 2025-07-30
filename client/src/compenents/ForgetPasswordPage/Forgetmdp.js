import React, { useState } from 'react';
import axios from 'axios';
import './Forgetmdp.css';
import logo from '../../assets/ImageHomePage/logo.png';

const API_URL = process.env.REACT_APP_API_URL || "https://cookneat-server.onrender.com";

const Forgetmdp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email && !username) {
      setError("Veuillez saisir votre e-mail ou votre pseudo.");
      setMessage('');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const data = {
        ...(email && { email }),
        ...(username && { username }),
      };

      const res = await axios.post(`${API_URL}/api/auth/forgot-password`, data);

      setMessage(res.data.message || "Un lien de réinitialisation a été envoyé si vos informations sont correctes.");
      setEmail('');
      setUsername('');
    } catch (err) {
      setError(
        err.response?.data?.message || "Une erreur est survenue. Veuillez réessayer plus tard."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Forgetmdp-background">
      <a href="/Homepage"><img src={logo} alt="Logo CookNeat" /></a>
      <div className="forget-container">
        <h1>Mot de passe oublié ?</h1>
        <p>
          Pour récupérer votre mot de passe, veuillez saisir votre pseudo ou adresse email associé à votre compte.
          Un lien de réinitialisation vous sera envoyé par email si les informations sont correctes.
        </p>
        <form className="input-forget" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Votre e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <p>ou</p>
          <input
            type="text"
            placeholder="Pseudo"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
          <button type="submit" className="btn-forget-password" disabled={loading}>
            {loading ? "Envoi..." : "Valider"}
          </button>
        </form>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Forgetmdp;
