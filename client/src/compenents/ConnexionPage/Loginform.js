import React, { useState, useContext } from 'react';
import './Loginform.css';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Loginform = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    setLoading(true);

    try {
      const response = await fetch('https://cookneat-server.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la connexion.');
      }

      const { token, user, message: serverMessage } = data;

      // Stockage et contexte d'authentification
      login({
        token,
        user: {
          username: user.username,
          role: user.role,
          id: user.id, // Pas user._id car ton back renvoie "id" dans la réponse JSON
          image: user.image || null
        }
      });

      setMessage(serverMessage || 'Connexion réussie');
      setEmail('');
      setPassword('');
      setTimeout(() => navigate('/profilpage'), 1500);
    } catch (err) {
      setMessage(err.message);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form">
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h1>Connexion</h1>
          <div className="container-form">
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
              {loading ? 'Connexion...' : 'Se connecter'}
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
              Pas encore de compte ? <Link to="/register">S’inscrire</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Loginform;
