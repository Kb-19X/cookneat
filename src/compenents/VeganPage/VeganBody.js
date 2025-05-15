import React, { useState } from 'react';
import './VeganBody.css';


import bowl_quinoa from '../../assets/ImageVeganPage/bowl_quinoa.webp';
import curry from '../../assets/ImageVeganPage/curry.png';
import nouilles from '../../assets/ImageVeganPage/nouilles.webp';
import Padthai from '../../assets/ImageVeganPage/Padthai.jpg';

import clock from '../../assets/ImageHomePage/clock-one.png';
import commentIcon from '../../assets/ImagePlatsPage/comment.png';
import like from '../../assets/ImagePlatsPage/like.png';
import share from '../../assets/ImagePlatsPage/share.png';

const recipes = [
  { id: 1, image: bowl_quinoa, title: "Bowl de quinoa et légumes d'hiver", description: "Un classique revisité sans gluten, avec du riz parfumé, des légumes croquants, une touche d’exotisme.", category: "Entrée", time: "15 min" },
  { id: 2, image: curry, title: "Curry de légumes (végétalien)", description: "Un curry épicé et crémeux, riche en légumes de saison.", category: "Plat principal", time: "30 min" },
  { id: 3, image: nouilles, title: "Nouilles aux légumes", description: "Nouilles sautées aux légumes croquants, assaisonnées d'une sauce soja légère.", category: "Plat principal", time: "40 min" },
  { id: 4, image: Padthai, title: "Pad Thai", description: "Classique thaïlandais à base de nouilles de riz, tofu et cacahuètes.", category: "Plat principal", time: "20 min" },
  { id: 5, image: bowl_quinoa, title: "Smoothie vert", description: "Un smoothie détox plein de vitamines.", category: "Boisson", time: "5 min" },
  { id: 6, image: curry, title: "Soupe miso améliorée", description: "Soupe miso aux champignons et wakamé.", category: "Entrée", time: "15 min" },
  { id: 7, image: nouilles, title: "Salade de lentilles", description: "Salade de lentilles tièdes au vinaigre balsamique.", category: "Entrée", time: "25 min" },
  { id: 8, image: Padthai, title: "Tacos vegan", description: "Tacos garnis de haricots noirs et avocat.", category: "Plat principal", time: "30 min" },
  { id: 9, image: bowl_quinoa, title: "Risotto crémeux", description: "Risotto aux champignons sans produits laitiers.", category: "Plat principal", time: "45 min" },
  { id: 10, image: curry, title: "Chili sin carne", description: "Chili sin carne épicé aux haricots rouges.", category: "Plat principal", time: "50 min" },
];

const VeganBody = () => {
  const [selectedCategory, setSelectedCategory] = useState('Toutes');

  const filteredRecipes = selectedCategory === 'Toutes' ? recipes : recipes.filter(recipe => recipe.category === selectedCategory);

  return (
    <div className="detox">
      <div className="detox-container">
        <div className="titre-detox"><h1>Recettes Vegan</h1></div>

        <div className="filter-container mb-4">
          <select className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="Toutes">Toutes les catégories</option>
            <option value="Entrée">Entrée</option>
            <option value="Plat principal">Plat principal</option>
            <option value="Boisson">Boisson</option>
          </select>
        </div>

        {filteredRecipes.map((recipe) => (
          <div className="detox-product" key={recipe.id}>
            <img src={recipe.image} alt={recipe.title} />
            <div className="detail-detox-product">
              <h2>{recipe.title}</h2>
              <p className="p-detox">{recipe.description}</p>
              <div className="detail-detox">
                <div className="time-vegan">
                  <img src={clock} alt="Temps" />
                  <p>{recipe.time}</p>
                </div>
                <div className="btn-vegan">
                  <img src={like} alt="Like" />
                  <img src={commentIcon} alt="Commenter" />
                  <img src={share} alt="Partager" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VeganBody;