import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import logo2 from "../../assets/ImageHomePage/logo2.svg";
import userIcon from "../../assets/ImageHomePage/user.png";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const burger = document.querySelector(".burger-menu");
    const menu = document.querySelector("nav ul.menu");

    const toggleMenu = () => {
      menu.classList.toggle("active");
      burger.classList.toggle("active");
    };

    burger.addEventListener("click", toggleMenu);

    return () => {
      burger.removeEventListener("click", toggleMenu);
    };
  }, []);

  // Fermer le menu déroulant si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/login");
  };

  // ✅ Pour déboguer : vérifie bien le contenu de `user`
  useEffect(() => {
    console.log("🧑 Utilisateur connecté :", user);
  }, [user]);

  return (
    <div className="navbar">
      <nav>
        <div className="burger-menu">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className="menu">
          <li>
            <a href="/" className="logo-link">
              <img src={logo2} alt="Logo" />
            </a>
          </li>

          <div className="container">
            <li><a className="ab" href="/Plats">Rapide & facile</a></li>
            <li><a href="/NutritionSanté">Healthy</a></li>
            <li><a href="/patesnouilles">Confort food</a></li>
            <li><a href="/Viandes">Saveurs du monde</a></li>
            <li><a href="/ChefRecipe">Recettes du chef</a></li>

            {user?.role === 'admin' && (
              <li>
                <a className="admin-button" href="/dashboard">Dashboard Admin</a>
              </li>
            )}
          </div>

          <div className="input-navbar-container">
            <input
              className="input-navbar"
              type="text"
              placeholder="Recherche . . ."
            />

            {!isAuthenticated ? (
              <a className="connexion-btn" href="/Connexion">
                Connexion
              </a>
            ) : (
              <div
                className="user-profile"
                ref={dropdownRef}
                onClick={toggleDropdown}
                style={{ position: "relative" }}
              >
                <div className="status-indicator" title="Connecté" />
                <img
                  className="user-icon"
                  src={user?.image || userIcon}
                  alt="Profil"
                />
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <a href="/profilPage">👤 Profil</a>
                    <button onClick={handleLogout}>🚪 Déconnexion</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
