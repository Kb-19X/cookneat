import React, { useState, useContext } from 'react';
import axios from 'axios';
import './Loginform.css';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Loginform = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

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
          username: user.username,
          role: user.role,
          id: user._id,
          image: user.image || null
        }
      });

      setMessage(serverMessage || 'Connexion réussie');
      setEmail('');
      setPassword('');
      navigate('/profilpage');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erreur lors de la connexion.';
      setMessage(errorMessage);
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
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="login-btn" type="submit">Se connecter</button>
            {message && (
              <p style={{ marginTop: '10px', color: message.startsWith("Connexion") ? 'lightgreen' : 'salmon' }}>
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
