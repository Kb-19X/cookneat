import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Createcompte.css';

const Createcompte = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);
    setLoading(true);

    try {
      const response = await fetch('https://cookneat-server.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de l'inscription.");
      }

      setMessage("✅ " + (data.message || "Compte créé avec succès."));
      setUsername("");
      setEmail("");
      setPassword("");

      // Redirection automatique après 1,5 sec
      setTimeout(() => navigate('/connexion'), 1500);

    } catch (err) {
      setMessage("❌ " + err.message);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form">
      <div className="login-container">
        <form className="login-form" onSubmit={handleRegister}>
          <h1>Inscription</h1>
          <div className="container-form">
            <input
              type="text"
              placeholder="Pseudo"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />

            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? 'Inscription...' : "S'inscrire"}
            </button>

            {loading && <div className="loader"></div>}

            {message && (
              <p
                style={{
                  marginTop: '10px',
                  color: isError ? 'salmon' : 'lightgreen',
                  fontWeight: 'bold'
                }}
              >
                {message}
              </p>
            )}

            <p style={{ marginTop: '20px' }}>
              Déjà un compte ? <Link to="/connexion">Se connecter</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Createcompte;
