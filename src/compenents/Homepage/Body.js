import React, { useState } from 'react';
import './Body.css';


import Risotto from '../../assets/ImageHomePage/Risotto alla Milanese.jpg';
import bruschetta from '../../assets/ImageHomePage/bruschetta.jpg';
import ossobuco from '../../assets/ImageHomePage/osoobuco.jpg';
import pesto_alla_genovese from '../../assets/ImageFeculentPage/pesto_alla_genovese.webp';
import pates_thon from '../../assets/ImageFeculentPage/pates_thon.jpg';
import pate_ricotta from '../../assets/ImageFeculentPage/pate_ricotta.jpeg';
import etoilejaune from '../../assets/ImageHomePage/etoilejaune.png';


import etoilemauve from '../../assets/ImageHomePage/etoilemauve.png';

import countries from '../../assets/ImageHomePage/countries.png';
import profil from '../../assets/ImagePlatsPage/profil.png';


import comment from '../../assets/ImagePlatsPage/comment.png';
import like from '../../assets/ImagePlatsPage/like.png';
import share  from '../../assets/ImagePlatsPage/share.png';

const Body = () => {
 
  
    const [comments, setComments] = useState({});
    const [showComment, setShowComment] = useState(null); // On garde un seul ID actif
  
    const handleCommentChange = (id, value) => {
      setComments((prev) => ({ ...prev, [id]: value }));
    };
  
    const submitComment = (id) => {
      if (!comments[id] || comments[id].trim() === '') {
        alert('Le commentaire ne peut pas être vide.');
        return;
      }
      console.log(`Commentaire pour la recette ${id} : ${comments[id]}`);
      setComments((prev) => ({ ...prev, [id]: '' })); // Efface le commentaire après soumission
    };
  
    const toggleCommentSection = (id) => {
      setShowComment(prev => prev === id ? null : id); // Si on clique sur la même recette, on cache la section
    };
  
    return (
        <div className='plats-body-container'>
        <div className="plats-titres">
            <img src={countries} alt="" />
            <h1>Plats</h1>
            

            <img src={countries} alt="" />
    </div>
          <div className='plats-container'>
            <div className='plats-card'>
              <img className='img-card' src={pates_thon} alt="" />
              <h1>Pâtes</h1>
              <p>20 minutes</p>
              <div className='stars-container'>
                <p>★</p>
                <p>★</p>
                <p>★</p>
                <p>★</p>
                <p>★</p>
              </div>
              <a href="" >détails</a>
            </div>
          </div>
       
          <div className='title-comment'>
          <img src={comment} alt="" />
            <h1 >Commentaires</h1>
            <img src={comment} alt="" />

          </div>


          <div className='comment-container'>
            <div className='profil-comment'>
            <img src={profil} alt="" />
            </div>
            <div className='infos-comment'>
              <p>surname name</p>
              <div className='etoile-container'>
              <img src={etoilemauve} alt="" />
              <img src={etoilemauve} alt="" />
              <img src={etoilemauve} alt="" />
              <img src={etoilemauve} alt="" />
              <img src={etoilemauve} alt="" />
              </div>
              <p>12/12/2024</p>
            </div>
            <div className='fav-icon'>
              <img src={etoilemauve} alt="" />
            </div>
          </div>
            <div className='comment-zone'>
              <div className='comment-recette'>
              <p>Vous avez commentez la recette :</p>
              <a href="/productpage">Risotto alla Milanese </a>
              </div>
             
              <p>Un tiramisu absolument délicieux ! La recette est simple et le goût est incroyablement riche. Je l’ai fait pour un dîner entre amis, et tout le monde a adoré !</p>
              <div className='add-comment'>
              <input type="text" placeholder='Ajoutez un commentaire' />
              <button>Envoyer</button>
            </div>
            </div>

            <div className='comment-container'>
            <div className='profil-comment'>
            <img src={profil} alt="" />
            </div>
            <div className='infos-comment'>
              <p>surname name</p>
              <div className='etoile-container'>
              <img src={etoilemauve} alt="" />
              <img src={etoilemauve} alt="" />
              <img src={etoilemauve} alt="" />
              <img src={etoilemauve} alt="" />
              <img src={etoilemauve} alt="" />
              </div>
              <p>12/12/2024</p>
            </div>
            <div className='fav-icon'>
              <img src={etoilemauve} alt="" />
            </div>
          </div>
            <div className='comment-zone'>
              <div className='comment-recette'>
              <p>Vous avez commentez la recette :</p>
              <a href="/productpage">Risotto alla Milanese </a>
              </div>
             
              <p>Un tiramisu absolument délicieux ! La recette est simple et le goût est incroyablement riche. Je l’ai fait pour un dîner entre amis, et tout le monde a adoré !</p>
              
              <div className='add-comment'>
              <input type="text" placeholder='Ajoutez un commentaire' />
              <button>Envoyer</button>
            </div>
            </div>

            <div className='comment-container'>
            <div className='profil-comment'>
            <img src={profil} alt="" />
            </div>
            <div className='infos-comment'>
              <p>surname name</p>
              <div className='etoile-container'>
              <img src={etoilemauve} alt="" />
              <img src={etoilemauve} alt="" />
              <img src={etoilemauve} alt="" />
              <img src={etoilemauve} alt="" />
              <img src={etoilemauve} alt="" />
              </div>
              <p>12/12/2024</p>
            </div>
            <div className='fav-icon'>
              <img src={etoilemauve} alt="" />
            </div>
          </div>
            <div className='comment-zone'>
              <div className='comment-recette'>
              <p>Vous avez commentez la recette :</p>
              <a href="/productpage">Risotto alla Milanese </a>
              </div>
             
              <p>Un tiramisu absolument délicieux ! La recette est simple et le goût est incroyablement riche. Je l’ai fait pour un dîner entre amis, et tout le monde a adoré !</p>
            <div className='add-comment'>
              <input type="text" placeholder='Ajoutez un commentaire' />
              <button>Envoyer</button>
            </div>
            </div>
            
            <div>
            <h1 className='donnez-avis'>Donnez-nous votre avis !</h1>
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
          <div className='btn-envoyer-avis'>
          <a className="envoyer-avis" href="#">Envoyer</a>
          </div>
   



      </div>
    );
  };
export default Body;
