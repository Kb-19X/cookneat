import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vérifie si un token est déjà stocké au chargement
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          username: decoded.name,
          role: decoded.role,
          id: decoded.id,
          image: decoded.image || null, // optionnel si le token contient une image
        });
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Token invalide ❌", err);
        localStorage.removeItem('token');
      }
    }
  }, []);

  // Connexion : on stocke le token et l'utilisateur transformé
  const login = ({ token, user }) => {
    localStorage.setItem('token', token);
    setUser(user); // user doit contenir username, role, id, image
    setIsAuthenticated(true);
  };

  // Déconnexion
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
