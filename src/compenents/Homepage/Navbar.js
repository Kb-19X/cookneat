import React, { useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/ImageHomePage/logo.png';
import spatula from '../../assets/ImageHomePage/spatula.png';

const Navbar = () => {
  // Ajouter le script JS pour activer le menu burger
  useEffect(() => {
    const burger = document.querySelector('.burger-menu');
    const menu = document.querySelector('nav ul.menu');
    
    const toggleMenu = () => {
      menu.classList.toggle('active');
      burger.classList.toggle('active');
    };

    burger.addEventListener('click', toggleMenu);

    // Cleanup pour éviter les erreurs si le composant est démonté
    return () => {
      burger.removeEventListener('click', toggleMenu);
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
          <a href="/"><img src={logo} alt="Logo" /></a>
          <div className="container">
            <a className="ab" href="/Plats"><li>Plats</li></a>
            <a href="/NutritionSanté"><li>Nutrition et Santé</li></a>
            <a href="./patesnouilles"><li>Pâtes / Riz / Nouilles</li></a>
            <a href=""><li>Viandes/Poissons</li></a>
            <a href=""><li>Desserts</li></a>
          </div>
          <div className="input-navbar-container">
            <input className="input-navbar" type="text" placeholder="Recherche . . ." />
            <a href=""><img src={spatula} alt="Recherche" /></a>
            <a className="connexion-btn" href="./Connexion">Connexion</a>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
