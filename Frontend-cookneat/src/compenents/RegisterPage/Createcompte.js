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
    try {
      await axios.post("/api/auth/register", {
        username,
        email,
        password,
      });
      setMessage("✅ Inscription réussie !");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setMessage("❌ Erreur : " + err.response?.data?.error || "Serveur");
    }
  };

  return (
    <div className='form'>
      <div className='login-container'>
        <form className='login-form' onSubmit={handleRegister}>
          <h1>Inscription</h1>
          <div className='container-form'>
            <input type="text" placeholder='Pseudo' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='Mot de passe' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className='login-btn' type="submit">S'inscrire</button>
            {message && <p style={{ marginTop: '10px', color: 'white' }}>{message}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Createcompte;
