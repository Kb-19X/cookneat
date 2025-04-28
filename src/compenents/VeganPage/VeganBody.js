import React, { useState } from 'react'; // AJOUTER useState pour ouvrir/fermer
import './VeganBody.css'

import bowl_quinoa from '../../assets/ImageVeganPage/bowl_quinoa.webp';
import curry from '../../assets/ImageVeganPage/curry.png';
import nouilles from '../../assets/ImageVeganPage/nouilles.webp';
import Padthai from '../../assets/ImageVeganPage/Padthai.jpg';

import clock from '../../assets/ImageHomePage/clock-one.png';
import celeri from '../../assets/ImageDetoxPage/celeri.png';
import idea from '../../assets/ImageDetoxPage/idea.png';

import oeuf from '../../assets/ImageNoglutenPage/oeuf.png';
import douce from '../../assets/ImageNoglutenPage/douce.png';
import amande from '../../assets/ImageNoglutenPage/amande.png';

import comment from '../../assets/ImagePlatsPage/comment.png';
import like from '../../assets/ImagePlatsPage/like.png';
import share from '../../assets/ImagePlatsPage/share.png';

const VeganBody = () => {
  const [showComments, setShowComments] = useState(false); // etat pour ouvrir/fermer

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className='detox'>
      <div className='tips-detox'>
        <img className='idea' src={idea} alt="" />
        <div className='tips-ingredient'>
          <img src={oeuf} alt="" />
          <p>"Riches en protéines de haute qualité, vitamines essentielles et minéraux, soutiennent la santé musculaire, cérébrale et apportent une énergie durable."</p>
        </div>

        <div className='tips-ingredient'>
          <img src={douce} alt="" />
          <p>"Riches en fibres, vitamines A et C, antioxydants et minéraux, favorisent la digestion, renforcent le système immunitaire et apportent une énergie durable."</p>
        </div>

        <div className='tips-ingredient'>
          <img src={amande} alt="" />
          <p>"Riches en bonnes graisses, protéines, fibres, vitamines E et minéraux, boostent l'énergie, protègent le cœur et favorisent une belle peau et des os solides."</p>
        </div>
      </div>

      <div className='detox-container'>
        <div className='titre-detox'>
          <h1>Recettes Vegan</h1>
        </div>

        <div className='detox-product'>
          <img src={bowl_quinoa} alt="" />

          <div className='detail-detox-product'>
            <h2>Bowl de quinoa et légumes d'hiver</h2>
            <p className='p-detox'>Un classique revisité sans gluten, avec du riz parfumé, des légumes croquants, des œufs moelleux et une touche d’exotisme.</p>
            <div className='detail-detox'>
              <div className='time-vegan'>
                <img src={clock} alt="" />
                <p>15 min</p>
              </div>
              <div className='btn-vegan'>
                <img src={like} alt="" />
                <img src={comment} alt="" />
                <img src={share} alt="" />
              </div>
            </div>
        <div className='comments-section'>
          <button className='toggle-button' onClick={toggleComments}>
            {showComments ? "Masquer les commentaires" : "Voir les commentaires"}
          </button>

          <div className={`comments-hidden ${showComments ? 'open' : ''}`}>
            <p><strong>Jean :</strong> Super recette !</p>
            <p><strong>Marie :</strong> Très bon et facile à faire.</p>
            <p><strong>Paul :</strong> J'ai ajouté du poulet, excellent !</p>
          </div>
        </div>
          </div>
        </div>

        {/* ZONE COMMENTAIRES */}

        {/* CONTINUATION */}
        <div className='detox-product'>
          <img src={curry} alt="" />
          <div className='detail-detox-product'>
            <h2>Curry de légumes (végétalien)</h2>
            <p className='p-detox'>Des cookies dorés et croustillants à l'extérieur, fondants à l'intérieur, parfaits pour un plaisir gourmand et sans compromis.</p>
            <div className='detail-detox'>
              <p>Biscuit - très facile</p>
              <img src={clock} alt="" />
              <p>30 min</p>
            </div>
          </div>
        </div>

        <div className='detox-product'>
          <img src={nouilles} alt="" />
          <div className='detail-detox-product'>
            <h2>Nouilles aux légumes</h2>
            <p className='p-detox'>Un gratin généreux, alliant la douceur des patates douces et une texture fondante, idéal pour un repas réconfortant.</p>
            <div className='detail-detox'>
              <p>Plat - très facile</p>
              <img src={clock} alt="" />
              <p>1 heure 40 minutes</p>
            </div>
          </div>
        </div>

        <div className='detox-product'>
          <img src={Padthai} alt="" />
          <div className='detail-detox-product'>
            <h2>Pad Thai</h2>
            <p className='p-detox'>Un dessert raffiné et sans gluten, aux saveurs intenses de rhum et d’amandes, pour une pause sucrée incontournable.</p>
            <div className='detail-detox'>
              <p>Dessert - très facile</p>
              <img src={clock} alt="" />
              <p>15 min</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default VeganBody;
