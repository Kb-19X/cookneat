import React, { useState } from 'react'; // AJOUTER useState pour ouvrir/fermer
import './VeganBody.css'

import bowl_quinoa from '../../assets/ImageVeganPage/bowl_quinoa.webp';
import curry from '../../assets/ImageVeganPage/curry.png';
import nouilles from '../../assets/ImageVeganPage/nouilles.webp';
import Padthai from '../../assets/ImageVeganPage/Padthai.jpg';

import clock from '../../assets/ImageHomePage/clock-one.png';
import commentIcon from '../../assets/ImagePlatsPage/comment.png';
import like from '../../assets/ImagePlatsPage/like.png';
import share from '../../assets/ImagePlatsPage/share.png';

const recipes = [
  { id: 1, image: bowl_quinoa, title: "Bowl de quinoa et légumes d'hiver", description: "Un classique revisité sans gluten, avec du riz parfumé, des légumes croquants, une touche d’exotisme.", time: "15 min" },
  { id: 2, image: curry, title: "Curry de légumes (végétalien)", description: "Un curry épicé et crémeux, riche en légumes de saison.", time: "30 min" },
  { id: 3, image: nouilles, title: "Nouilles aux légumes", description: "Nouilles sautées aux légumes croquants, assaisonnées d'une sauce soja légère.", time: "40 min" },
  { id: 4, image: Padthai, title: "Pad Thai", description: "Classique thaïlandais à base de nouilles de riz, tofu et cacahuètes.", time: "20 min" },
  { id: 5, image: bowl_quinoa, title: "Smoothie vert", description: "Un smoothie détox plein de vitamines.", time: "5 min" },
  { id: 6, image: curry, title: "Soupe miso améliorée", description: "Soupe miso aux champignons et wakamé.", time: "15 min" },
  { id: 7, image: nouilles, title: "Salade de lentilles", description: "Salade de lentilles tièdes au vinaigre balsamique.", time: "25 min" },
  { id: 8, image: Padthai, title: "Tacos vegan", description: "Tacos garnis de haricots noirs et avocat.", time: "30 min" },
  { id: 9, image: bowl_quinoa, title: "Risotto crémeux", description: "Risotto aux champignons sans produits laitiers.", time: "45 min" },
  { id: 10, image: curry, title: "Chili sin carne", description: "Chili sin carne épicé aux haricots rouges.", time: "50 min" },
];

const VeganBody = () => {
  const [showComments, setShowComments] = useState(recipes.map(() => false));
  const [showInput, setShowInput] = useState(recipes.map(() => false));
  const [newComment, setNewComment] = useState(recipes.map(() => ""));
  const [comments, setComments] = useState(
    recipes.map(() => [
      { author: 'Jean', text: 'Super recette !' },
      { author: 'Marie', text: 'Très bon et facile à faire.' },
      { author: 'Paul', text: "J'ai ajouté du poulet, excellent !" }
    ])
  );

  const toggleComments = (index) => {
    setShowComments(prev => prev.map((v, i) => i === index ? !v : v));
  };
  const toggleInput = (index) => {
    setShowInput(prev => prev.map((v, i) => i === index ? !v : v));
  };
  const handleCommentChange = (index, value) => {
    setNewComment(prev => prev.map((v, i) => i === index ? value : v));
  };
  const addComment = (index) => {
    if (!newComment[index].trim()) return;
    setComments(prev => prev.map((list, i) => i === index ? [...list, { author: 'Vous', text: newComment[index] }] : list));
    setNewComment(prev => prev.map((v, i) => i === index ? '' : v));
    setShowInput(prev => prev.map((v, i) => i === index ? false : v));
    setShowComments(prev => prev.map((v, i) => i === index ? true : v));
  };

  return (
    <div className="detox">
      <div className="detox-container">
        <div className="titre-detox"><h1>Recettes Vegan</h1></div>
        {recipes.map((recipe, idx) => (
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
                  <img src={commentIcon} alt="Commenter" onClick={() => toggleInput(idx)} style={{ cursor: 'pointer' }} />
                  <img src={share} alt="Partager" />
                </div>
              </div>

              {showInput[idx] && (
                <div className="new-comment">
                  <input
                    type="text"
                    value={newComment[idx]}
                    onChange={(e) => handleCommentChange(idx, e.target.value)}
                    placeholder="Écrire un commentaire..."
                  />
                  <button onClick={() => addComment(idx)}>Valider</button>
                </div>
              )}

              <div className="comments-section">
                <button className="toggle-button" onClick={() => toggleComments(idx)}>
                  {showComments[idx] ? 'Masquer les commentaires' : 'Voir les commentaires'}
                </button>
                <div className={`comments-hidden ${showComments[idx] ? 'open' : ''}`}>
                  {comments[idx].map((c, i) => (
                    <p key={i}><strong>{c.author} :</strong> {c.text}</p>
                  ))}
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