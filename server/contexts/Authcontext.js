import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          username: decoded.name,
          role: decoded.role,
          id: decoded.id,
        });
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Token invalide ❌", err);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = ({ token, user }) => {
    localStorage.setItem('token', token);
    setUser(user); // user doit contenir username et role
    setIsAuthenticated(true);
  };

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
