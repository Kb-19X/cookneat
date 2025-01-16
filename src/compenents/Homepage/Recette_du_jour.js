import React from 'react';
import './Recette_du_jour.css';
import bruschetta from '../../assets/ImageHomePage/bruschetta.jpg';
import coeur from '../../assets/ImageHomePage/coeur.png';
import ossobuco from '../../assets/ImageHomePage/osoobuco.jpg';
import comment from '../../assets/ImageHomePage/comment.png';
import like from '../../assets/ImageHomePage/like.png';
import share from '../../assets/ImageHomePage/share.png';
import tool from '../../assets/ImageHomePage/tool.png';
import chef from '../../assets/ImageHomePage/chef.png';

const Recette_du_jour = () => {
  return (
    <div className='pagejour'>  
    <div className='description-pagejour'>
        <p className='pagejour-texte'>"Découvrez chaque jour des recettes savoureuses et faciles à réaliser pour régaler vos proches ! Inspirez-vous, cuisinez, et partagez des moments gourmands."</p>
    </div>
        <div className='recettedujour'>
        <img src={tool} alt="" />
        <h1>La recette du jour</h1>
        <img src={tool} alt="" />
        
        </div>

        <div className='recetteday-container'>

            <div className='recetteday-left'>
                
            <img src={ossobuco} alt="" />
            <h1>Osso buco</h1>
            </div>

            <div className='recetteday-right'>
            <p className='titre-recetteday'>Plongez dans les saveurs de l'Italie avec notre recette du jour, l'Osso Buco !</p>
            <p className='stitre-recetteday'> Ce plat traditionnel milanais, à base de jarret de veau mijoté, est connu pour sa viande fondante et son goût irrésistible, agrémenté d'arômes d'ail, de vin blanc et d'herbes fraîches. Accompagné de gremolata (un mélange de persil, citron et ail haché), l'Osso Buco s'harmonise à merveille avec un risotto alla milanese ou des tagliatelles fraîches.</p>
            <div class="stars">
                <p>56</p>
                <p className='avis'>avis</p>
                <span className='first-stars'>★</span>
                <span className='starsspan'>★</span>
                <span className='starsspan'>★</span>
                <span className='starsspan'>★</span>
                <span className='starsspan'>★</span>
               
                <div className='com-recetteday'>
                <a href="#"><img src={like} alt="" /></a>
                <a href="#"><img src={comment} alt="" /></a>
                <a href="#"><img src={share} alt="" /></a>
                </div>
            </div>
            
        </div>

        </div>








        </div>
  )
}

export default Recette_du_jour;
