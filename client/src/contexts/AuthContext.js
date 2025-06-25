// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Vérifie le token au chargement de l'app
  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setUser({ username });
    }
  }, []);

  const login = ({ token, username }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    setUser({ username });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);