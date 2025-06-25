import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import logo2 from "../../assets/ImageHomePage/logo2.svg";
import user from "../../assets/ImageHomePage/user.png";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("username");
    if (token && name) {
      setIsLoggedIn(true);
      setUsername(name);
    }
  }, []);

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

  // Ferme le menu dropdown quand on clique à l’extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/"; // redirection vers accueil
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

            {!isLoggedIn ? (
              <a className="connexion-btn" href="/Connexion">Connexion</a>
            ) : (
              <div
                className="connected-user"
                ref={dropdownRef}
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <div className="status-dot" />
                <img className="user-icon" src={user} alt="Profil" />

                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <a href="/profilPage">Mon profil</a>
                    <button onClick={handleLogout}>Se déconnecter</button>
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
