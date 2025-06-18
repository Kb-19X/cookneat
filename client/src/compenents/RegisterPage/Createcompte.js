import React, { useState } from 'react';
import axios from 'axios';
import './Createcompte.css';

const Createcompte = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(""); // reset message à chaque tentative

    try {
      await axios.post(
        'https://cookneat-server.onrender.com/api/auth/register',
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true, // seulement si tu utilises des cookies ou sessions
        }
      );

      setMessage("✅ Inscription réussie !");
      setUsername("");
      setEmail("");
      setPassword("");

    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data ||
        "❌ Erreur du serveur.";
      setMessage("❌ " + errorMessage);
    }
  };

  return (
    <div className='form'>
      <div className='login-container'>
        <form className='login-form' onSubmit={handleRegister}>
          <h1>Inscription</h1>
          <div className='container-form'>
            <input
              type="text"
              placeholder='Pseudo'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
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
            <button className='login-btn' type="submit">S'inscrire</button>
            {message && (
              <p style={{ marginTop: '10px', color: message.startsWith("✅") ? 'lightgreen' : 'salmon' }}>
                {message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Createcompte;
