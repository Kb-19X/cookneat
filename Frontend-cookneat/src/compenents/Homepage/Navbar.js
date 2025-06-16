import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo2 from "../../assets/ImageHomePage/logo2.svg";
// import spatula from "../../assets/ImageHomePage/spatula.png";
import user from "../../assets/ImageHomePage/user.png"; // ← à ajouter dans ton dossier
// import tartiflette from "../../assets/ImageHomePage/tartiflette.jpg";
// import tiramisu from "../../assets/ImageHomePage/tiramisu.jpg";
// import osoobuco from "../../assets/ImageHomePage/osoobuco.jpg";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

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
            <li>
              <a className="ab" href="/Plats">
                Plats
              </a>
            </li>
            <li>
              <a href="/NutritionSanté">Nutrition et Santé</a>
            </li>
            <li>
              <a href="/patesnouilles">Pâtes / Riz / Nouilles</a>
            </li>
            <li>
              <a href="/Viandes">Viandes / Poissons</a>
            </li>
            <li>
              <a href="/desserts">Desserts</a>
            </li>
          </div>
          <div className="input-navbar-container">
            <input
              className="input-navbar"
              type="text"
              placeholder="Recherche . . ."
            />

            {!isLoggedIn ? (
              <a className="connexion-btn" href="/Connexion">
                Connexion
              </a>
            ) : (
              <div title={username}>
                <a href="/profilPage">
            
                  <img className="user-icon" src={user} alt="user" />
                </a>
              </div>
            )}
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
