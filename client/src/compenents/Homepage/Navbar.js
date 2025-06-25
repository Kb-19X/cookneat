import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo2 from "../../assets/ImageHomePage/logo2.svg";
import userIcon from "../../assets/ImageHomePage/user.png";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

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
            <li><a href="/desserts">Recettes du chef</a></li>
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
              <div className="user-profile" onClick={toggleDropdown}>
                <div className="status-indicator" />
                <img
                  className="user-icon"
                  src={user?.image || userIcon}
                  alt="Profil"
                />
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <a href="/profilPage">👤 Profil</a>
                    <button onClick={logout}>🚪 Déconnexion</button>
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
