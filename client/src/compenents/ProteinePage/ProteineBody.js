import React, { useState, useEffect } from 'react';
import './ProteineBody.css';
import { useNavigate } from 'react-router-dom';

import proteineBanner from '../../assets/ImageHomePage/proteines.jpg';

const ProteineBody = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  return (
    <div className="plats-body-container">
      <div className='background-cover'>
        <div className="banner-container">
          <div className="banner-left">
            <img src={proteineBanner} alt="Recettes protéinées" />
            <div className="banner-overlay-heal">
              <h1>Protéines</h1>
              <p>Des recettes riches en protéines pour l'énergie et la masse musculaire.</p>
            </div>
          </div>
          <div className="banner-right">
            <h2>Des repas boostés en protéines, bons pour les muscles et le moral !</h2>
            <p>
              Que ce soit pour la muscu, l'endurance ou une meilleure satiété, ces plats riches en protéines vous aideront à atteindre vos objectifs !
            </p>
          </div>
        </div>
      </div>

      <div className="rapide-header-section">
        <div className="rapide-text">
          <h1>🍗 Recettes Protéinées 🍳</h1>
          <p>Pour la prise de masse, l'énergie et une alimentation équilibrée.</p>
          <div className="rapide-benefits">
            <div className="benefit-box">💪 Prise de muscle</div>
            <div className="benefit-box">🥩 Ingrédients riches en protéines</div>
            <div className="benefit-box">🍽️ Satiété longue durée</div>
          </div>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher une recette protéinée..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="recipes-list">
        <p className="no-results">Aucune recette à afficher pour le moment.</p>
      </div>
    </div>
  );
};

export default ProteineBody;
