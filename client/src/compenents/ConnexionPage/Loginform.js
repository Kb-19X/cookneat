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
      const res = await axios.post(
        'https://cookneat-server.onrender.com/api/auth/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          // Si ton backend utilise des cookies : withCredentials: true
        }
      );

      console.log('✅ Réponse backend:', res.data);

      const { token, name } = res.data;

      // Enregistre le token et le nom d'utilisateur dans le localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('username', name);

      console.log("✅ Connexion réussie !");
      navigate('/ProfilPage');

    } catch (err) {
      console.error("❌ Erreur de connexion : ", err);

      if (err.response) {
        console.error("Détails : ", err.response.data);
        setError(err.response.data.message || "Erreur de connexion.");
      } else {
        setError("Erreur réseau. Veuillez réessayer.");
      }
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
