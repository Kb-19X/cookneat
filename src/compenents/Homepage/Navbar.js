  import React, { useState, useEffect } from 'react';
  import './Navbar.css';
  import logo from '../../assets/ImageHomePage/logo.png';
  import logo2 from '../../assets/ImageHomePage/logo2.svg';
  import spatula from '../../assets/ImageHomePage/spatula.png';
  import tiramisu from '../../assets/ImageHomePage/tiramisu.jpg';
  import tartiflette from '../../assets/ImageHomePage/tartiflette.jpg';
  import osoobuco from '../../assets/ImageHomePage/osoobuco.jpg';

  const Navbar = () => {
    const recipes = [
      {
        id: 1,
        title: "tartiflette",
        image: require('../../assets/ImageHomePage/tartiflette.jpg'),
        time: "35 minutes",
        rating: "★★★★★",
        reviews: "35 avis",
      },
      {
        id: 2,
        title: "tiramisu",
        image: require('../../assets/ImageHomePage/tiramisu.jpg'),
        time: "35 minutes",
        rating: "★★★★★",
        reviews: "35 avis",
      },
      {
        id: 3,
        title: "osoobuco",
        image: require('../../assets/ImageHomePage/osoobuco.jpg'),
        time: "35 minutes",
        rating: "★★★★★",
        reviews: "35 avis",
      },
    ];

    const [comments, setComments] = useState({});
    const [showComment, setShowComment] = useState(null);

    const handleCommentChange = (id, value) => {
      setComments((prev) => ({ ...prev, [id]: value }));
    };

    const submitComment = (id) => {
      if (!comments[id] || comments[id].trim() === '') {
        alert('Le commentaire ne peut pas être vide.');
        return;
      }
      console.log(`Commentaire pour la recette ${id} : ${comments[id]}`);
      setComments((prev) => ({ ...prev, [id]: '' }));
    };

    const toggleCommentSection = (id) => {
      setShowComment(prev => (prev === id ? null : id));
    };

    useEffect(() => {
      const burger = document.querySelector('.burger-menu');
      const menu = document.querySelector('nav ul.menu');

      const toggleMenu = () => {
        menu.classList.toggle('active');
        burger.classList.toggle('active');
      };

      burger.addEventListener('click', toggleMenu);

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
           <li><a href="/" className="logo-link"><img src={logo2} alt="Logo" /></a></li>
            <div className="container">
              <li><a className="ab" href="/Plats">Plats</a></li>
              <li><a href="/NutritionSanté">Nutrition et Santé</a></li>
              <li><a href="/patesnouilles">Pâtes / Riz / Nouilles</a></li>
              <li><a href="/Viandes">Viandes / Poissons</a></li>
              <li><a href="/desserts">Desserts</a></li>
            </div>
            <div className="input-navbar-container">
              <input className="input-navbar" type="text" placeholder="Recherche . . ." />
              <a href="/"><img src={spatula} alt="Recherche" /></a>
              <a className="connexion-btn" href="/Connexion">Connexion</a>
            </div>
          </ul>
        </nav>
      </div>
    );
  };

  export default Navbar;
