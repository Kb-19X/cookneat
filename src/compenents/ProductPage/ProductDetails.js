import React, { useState } from 'react';
import './ProductDetails.css';
import Risotto2 from '../../assets/ImageHomePage/Risotto2.webp';
import Risotto3 from '../../assets/ImageHomePage/Risotto3.webp';
import Risotto4 from '../../assets/ImageHomePage/Risotto4.jpg';
import Risotto5 from '../../assets/ImageHomePage/Risotto5.webp';
import clock from '../../assets/ImageHomePage/clock-one.png';
import hat from '../../assets/ImageHomePage/chef-hat.png';
import coin from '../../assets/ImageHomePage/coin.png';

import etoilejaune from '../../assets/ImageHomePage/etoilejaune.png';
import etoilemauve from '../../assets/ImageHomePage/etoilemauve.png';


import comment from '../../assets/ImagePlatsPage/comment.png';
import like from '../../assets/ImagePlatsPage/like.png';
import share from '../../assets/ImagePlatsPage/share.png';

const ProductDetails = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  // Fonction pour ouvrir la lightbox
  const openLightbox = (image) => {
    setCurrentImage(image);
    setIsLightboxOpen(true);
  };

  // Fonction pour fermer la lightbox
  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  // Fonction pour naviguer entre les images dans la lightbox
  const moveSlide = (direction) => {
    const images = [Risotto2, Risotto3, Risotto4, Risotto5];
    const currentIndex = images.indexOf(currentImage);
    let newIndex = currentIndex + direction;

    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;

    setCurrentImage(images[newIndex]);
  };

  return (
    <div>
      <div className="ProductDetails">
        <div className="Product-container">
          <h1>Risotto alla Milanese</h1>
          <div className="details-cadre-container">
            <img
              className="img-principal-details"
              src={Risotto2}
              alt="Risotto"
              onClick={() => openLightbox(Risotto2)}
            />
            <div className="bank-img-details">
              <img
                src={Risotto3}
                alt="Risotto 3"
                className="gallery-image"
                onClick={() => openLightbox(Risotto3)}
              />
              <img
                src={Risotto4}
                alt="Risotto 4"
                className="gallery-image"
                onClick={() => openLightbox(Risotto4)}
              />
              <img
                src={Risotto5}
                alt="Risotto 5"
                className="gallery-image"
                onClick={() => openLightbox(Risotto5)}
              />
            </div>
          </div>

          {/* Lightbox */}
          {isLightboxOpen && (
            <div className="lightbox">
              <span className="close" onClick={closeLightbox}>
                &times;
              </span>
              <div className="lightbox-content">
                <img className="lightbox-image" src={currentImage} alt="Agrandir l'image" />
              </div>
              <a className="prev" onClick={() => moveSlide(-1)}>
                &#10094;
              </a>
              <a className="next" onClick={() => moveSlide(1)}>
                &#10095;
              </a>
            </div>
          )}

          <div className="info-time-product">
            <img src={clock} alt="Temps" />
            <p>50 min</p>
            <img src={hat} alt="Difficulté" />
            <p>Moyen</p>
            <img src={coin} alt="Coût" />
            <p>Bon marché</p>
          </div>

          <div className="stars-product">
            <p>56</p>
            <p className="avis">avis</p>
            <span className="first-stars">★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <div className="com-recetteday">
              <a href="#">
                <img src={like} alt="Like" />
              </a>
              <a href="#">
                <img src={comment} alt="Commentaire" />
              </a>
              <a href="#">
                <img src={share} alt="Partager" />
              </a>
            </div>
          </div>

          <div className="ingredient-container">
            <h1>Ingrédients</h1>
            <div className="ingredients-grid">
              <div className="ingredients-left">
                <p>Riz à risotto</p>
                <p>Bouillon de bœuf</p>
                <p>Beurre</p>
                <p>Oignon(s) jaune émincé</p>
                <p>Poivre du moulin</p>
                <p>Parmesan râpé</p>
                <p>Moelle de bœuf</p>
                <p>Vin blanc sec</p>
                <p>Filament de Safran</p>
              </div>

              <div className="ingredients-right">
                <p>300 g</p>
                <p>80 cl</p>
                <p>45 g</p>
                <p>1</p>
                <p>/</p>
                <p>80 g</p>
                <p>50 g</p>
                <p>10 cl</p>
                <p>1 g</p>
              </div>
            </div>
          </div>

          <div className="prepa-container">
            <h1>Préparation</h1>
            <div className="prepa-texte-container">
              <h2>ÉTAPE 1</h2>
              <p>
                Faites chauffer le bouillon de bœuf dans une petite casserole. Prélevez-en l’équivalent d’un verre, et
                ajoutez-y le safran...
              </p>
              <h2>ÉTAPE 2</h2>
              <p>
                Faites chauffer le bouillon de bœuf dans une petite casserole. Prélevez-en l’équivalent d’un verre, et
                ajoutez-y le safran...
              </p>
              <h2>ÉTAPE 3</h2>
              <p>
                Faites chauffer le bouillon de bœuf dans une petite casserole. Prélevez-en l’équivalent d’un verre, et
                ajoutez-y le safran...
              </p>
              <h2>ÉTAPE 4</h2>
              <p>
                Faites chauffer le bouillon de bœuf dans une petite casserole. Prélevez-en l’équivalent d’un verre, et
                ajoutez-y le safran...
              </p>
              <h2>ÉTAPE 5</h2>
              <p>
                Faites chauffer le bouillon de bœuf dans une petite casserole. Prélevez-en l’équivalent d’un verre, et
                ajoutez-y le safran...
              </p>
              <h2>ÉTAPE 6</h2>
              <p>
                Faites chauffer le bouillon de bœuf dans une petite casserole. Prélevez-en l’équivalent d’un verre, et
                ajoutez-y le safran...
              </p>
             
            </div>
          </div>

          <div>
            <h1>Donnez-nous votre avis !</h1>
          </div>
          <div className="avis-product-detail">
            <img src={etoilemauve} alt="Étoile" />
            <img src={etoilemauve} alt="Étoile" />
            <img src={etoilemauve} alt="Étoile" />
            <img src={etoilemauve} alt="Étoile" />
            <img src={etoilemauve} alt="Étoile" />
           
            <p className="barre-recette">|</p>
            <p className="recette-critique">Que pensez-vous de cette recette ?</p>
          </div>
          <textarea className="textarea-avis" placeholder="Votre commentaire ici"></textarea>
          <a className="envoyer-avis" href="#">Envoyer</a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
