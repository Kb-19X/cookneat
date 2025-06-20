import React, { useState } from 'react';
import axios from 'axios';
import './Createcompte.css';

const Createcompte = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(""); // Réinitialise le message à chaque tentative

    try {
      const response = await axios.post(
        'https://cookneat-server.onrender.com/api/auth/register',
        {
          username,
          email,
          password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("✅ Inscription réussie :", response.data);
      setMessage("✅ " + response.data.message);

      // Réinitialise les champs
      setUsername("");
      setEmail("");
      setPassword("");

    } catch (err) {
      console.error("❌ Erreur axios :", err);
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "❌ Erreur serveur.";
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
