import React, { useState, useContext } from 'react';
import axios from 'axios';
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
      const response = await axios.post(
        'https://cookneat-server.onrender.com/api/auth/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { token, user, message: serverMessage } = response.data;

      login({
        token,
        user: {
          username: user.username, // Vérifie si le backend renvoie "username"
          role: user.role,
          id: user._id,
          image: user.image || null
        }
      });

      setMessage(serverMessage || 'Connexion réussie');
      setEmail('');
      setPassword('');
      setTimeout(() => navigate('/profilpage'), 1500); // Petite attente avant la redirection
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erreur lors de la connexion.';
      setMessage(errorMessage);
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
