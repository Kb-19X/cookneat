import React, { useState } from 'react';
import axios from 'axios';
import './Loginform.css';
import { useNavigate } from 'react-router-dom';

const Connexion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('/api/auth/login', { email, password });

      // Stockage du token en local
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);

      // Redirection vers la page d'accueil ou autre
      navigate('/');
    } catch (err) {
      console.error(err);
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className='form'>
      <div className='login-container'>
        <form className='login-form' onSubmit={handleLogin}>
          <h1>Connexion</h1>

          <div className='container-form'>
            {error && <p className="error-message">{error}</p>}

            <input
              type="email"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder='Mot de passe'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className='forgetmdp'>
              <a href="/ForgetPassword">Mot de passe oublié ?</a>
            </div>

            <div className='create-account'>
              <p>Vous n'avez pas de compte ?</p>
              <a href="/Register">Créer un compte</a>
            </div>

            <button type="submit" className='login-btn'>Se connecter</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Connexion;
