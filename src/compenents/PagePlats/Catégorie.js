import React from 'react'
import './Catégorie.css'
import macaroni from '../../assets/ImagePlatsPage/macaroni.jpg';
import boule_jambon_fromage from '../../assets/ImagePlatsPage/boule_jambon_fromage.jpg';
import macarons from '../../assets/ImagePlatsPage/macarons.jpeg';
import pancake from '../../assets/ImagePlatsPage/pancake.webp';
import choux_bruxelles from '../../assets/ImagePlatsPage/choux_bruxelles.webp';
import quiche_legume from '../../assets/ImagePlatsPage/quiche_legume.webp';
import muffins from '../../assets/ImagePlatsPage/muffins.jpg';
import bruschetta from '../../assets/ImageHomePage/bruschetta.jpg';
import ossobuco from '../../assets/ImageHomePage/osoobuco.jpg';
import tiramisu from '../../assets/ImageHomePage/tiramisu.jpg';


import commentimage from '../../assets/ImageHomePage/comment.png';
import like from '../../assets/ImageHomePage/like.png';
import share from '../../assets/ImageHomePage/share.png';
import etoilejaune from '../../assets/ImageHomePage/etoilejaune.png';
import etoilemauve from '../../assets/ImageHomePage/etoilemauve.png';
import profil from '../../assets/ImagePlatsPage/profil.png';


const catégorie = () => {
  
  return (
    
    <div className='Plats-grid'>

      
      <div className='Pats-grid-container-left'>
        <h1>Temps de préparation</h1>
        <div className='filtre-details'>
        <a href="#">Moins de 15 minutes</a>
        <a href="#">15 à 30 minutes</a>
        <a href="#">30 à 60 minutes</a>
        <a href="#">Plus de 60 minutes</a>
        </div>

        <h1>Régime Alimentaire</h1>
        <div className='filtre-details'>
        <a href="#">Végétarien</a>
        <a href="#">Végétalien (Vegan)</a>
        <a href="#">Sans gluten</a>
        <a href="#">Sans lactose</a>
        <a href="#">Halal</a>
        <a href="#">Casher</a>
        <a href="#">Faible en calories</a>
        </div>
        
        <h1>Type de Cuisine</h1>
        <div className='filtre-details'>
        <a href="#">Italienne</a>
        <a href="#">Française</a>
        <a href="#">Japonaise</a>
        <a href="#">Chinoise</a>
        <a href="#">Mexicaine</a>
        <a href="#">Indienne</a>
        <a href="#">Méditerranéenne</a>
        <a href="#">Américaine</a>
        <a href="#">Moyen-Orient</a>
        </div>

        <h1>Occasion</h1>
        <div className='filtre-details'>
        <a href="#">Repas quotidien</a>
        <a href="#">Repas en famille</a>
        <a href="#">Repas de fête</a>
        <a href="#">Anniversaire</a>
        <a href="#">Saint-Valentin</a>
        <a href="#">Noël</a>
        <a href="#">Nouvel An</a>
        <a href="#">Pique-nique</a>
        </div>
   
      

      </div>



    <div className='Plats'>

      <div className='plats-container'>
        <img src={macaroni} alt="" />
        <div className='plats-details'>
        <div className='name-plats'>
        <p>Macaroni</p>
        <p className='plats-time'>20 minutes</p>
        </div>
                <div className='plats-star'>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <p>35 avis</p>
                <div className='plats-share'>
                    <a href=""><img src={commentimage} className='img-plats' alt="" /></a>
                    <a href=""><img src={like} alt="" className='img-plats' /></a>
                    <a href=""><img src={share} alt="" className='img-plats' /></a>
                </div>
                </div>
                </div>
                
        </div>
        <div className='plats-container'>
        <img src={macarons} alt="" />
        <div className='plats-details'>
        <div className='name-plats'>
        <p>Macarons</p>
        <p className='plats-time'>20 minutes</p>
        </div>
                <div className='plats-star'>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <p>35 avis</p>
                <div className='plats-share'>
                    <a href=""><img src={commentimage} className='img-plats' alt="" /></a>
                    <a href=""><img src={like} alt="" className='img-plats' /></a>
                    <a href=""><img src={share} alt="" className='img-plats' /></a>
                </div>
                </div>
                </div>
                
        </div>
        <div className='plats-container'>
        <img src={pancake} alt="" />
        <div className='plats-details'>
        <div className='name-plats'>
        <p>Pancakes</p>
        <p className='plats-time'>20 minutes</p>
        </div>
                <div className='plats-star'>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <p>35 avis</p>
                <div className='plats-share'>
                    <a href=""><img src={commentimage} className='img-plats' alt="" /></a>
                    <a href=""><img src={like} alt="" className='img-plats' /></a>
                    <a href=""><img src={share} alt="" className='img-plats' /></a>
                </div>
                </div>
                </div>
                
        </div>
        <div className='plats-container'>
        <img src={tiramisu} alt="" />
        <div className='plats-details'>
        <div className='name-plats'>
        <p>Tiramisu</p>
        <p className='plats-time'>20 minutes</p>
        </div>
                <div className='plats-star'>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <p>35 avis</p>
                <div className='plats-share'>
                    <a href=""><img src={commentimage} className='img-plats' alt="" /></a>
                    <a href=""><img src={like} alt="" className='img-plats' /></a>
                    <a href=""><img src={share} alt="" className='img-plats' /></a>
                </div>
                </div>
                </div>

        </div>

        <div className='plats-container'>
        <img src={bruschetta} alt="" />
        <div className='plats-details'>
          <div className='name-plats'>
        <p>Bruschetta</p>
        <p className='plats-time'>20 minutes</p>
        </div>
                <div className='plats-star'>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <p>35 avis</p>
                <div className='plats-share'>
                    <a href=""><img src={commentimage} className='img-plats' alt="" /></a>
                    <a href=""><img src={like} alt="" className='img-plats' /></a>
                    <a href=""><img src={share} alt="" className='img-plats' /></a>
                </div>
                </div>
                </div>
                
        </div>

        <div className='plats-container'>
        <img src={ossobuco} alt="" />
        <div className='plats-details'>
        <div className='name-plats'>
        <p>Ossobuco</p>
        <p className='plats-time'>20 minutes</p>
        </div>
                <div className='plats-star'>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <p>35 avis</p>
                <div className='plats-share'>
                    <a href=""><img src={commentimage} className='img-plats' alt="" /></a>
                    <a href=""><img src={like} alt="" className='img-plats' /></a>
                    <a href=""><img src={share} alt="" className='img-plats' /></a>
                </div>
                </div>
                </div>
                
        </div>

        <div className='plats-container'>
        <img src={boule_jambon_fromage} alt="" />
        <div className='plats-details'>
        <div className='name-plats'>
        <p>Jambon fromage</p>
        <p className='plats-time'>20 minutes</p>
        </div>
                <div className='plats-star'>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <p>35 avis</p>
                <div className='plats-share'>
                    <a href=""><img src={commentimage} className='img-plats' alt="" /></a>
                    <a href=""><img src={like} alt="" className='img-plats' /></a>
                    <a href=""><img src={share} alt="" className='img-plats' /></a>
                </div>
                </div>
                </div>
                
        </div>

        <div className='plats-container'>
        <img src={quiche_legume} alt="" />
        <div className='plats-details'>
        <div className='name-plats'>
        <p>Quiche aux légumes</p>
        <p className='plats-time'>20 minutes</p>
        </div>
                <div className='plats-star'>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <p>35 avis</p>
                <div className='plats-share'>
                    <a href=""><img src={commentimage} className='img-plats' alt="" /></a>
                    <a href=""><img src={like} alt="" className='img-plats' /></a>
                    <a href=""><img src={share} alt="" className='img-plats' /></a>
                </div>
                </div>
                </div>
                
        </div>

        <div className='plats-container'>
        <img src={muffins} alt="" />
        <div className='plats-details'>
        <div className='name-plats'>
        <p>Muffins</p>
        <p className='plats-time'>20 minutes</p>
        </div>
                <div className='plats-star'>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <p>35 avis</p>
                <div className='plats-share'>
                    <a href=""><img src={commentimage} className='img-plats' alt="" /></a>
                    <a href=""><img src={like} alt="" className='img-plats' /></a>
                    <a href=""><img src={share} alt="" className='img-plats' /></a>
                </div>
                </div>
                </div>
                
        </div>
    </div>

  <div className='share-avis-container-left'>
      <h1>Vos recettes favorites !</h1>
      <div className='plats-container'>
        <img src={quiche_legume} alt="" />
        <div className='plats-details'>
        <div className='name-plats'>
        <p>Quiche aux légumes</p>
        <p className='plats-time'>20 minutes</p>
        </div>
                <div className='plats-star'>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <p>35 avis</p>
                <div className='plats-share'>
                    <a href=""><img src={commentimage} className='img-plats' alt="" /></a>
                    <a href=""><img src={like} alt="" className='img-plats' /></a>
                    <a href=""><img src={share} alt="" className='img-plats' /></a>
                </div>
                </div>
                </div>
                
        </div>


        <div className='plats-container'>
        <img src={quiche_legume} alt="" />
        <div className='plats-details'>
        <div className='name-plats'>
        <p>Quiche aux légumes</p>
        <p className='plats-time'>20 minutes</p>
        </div>
                <div className='plats-star'>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <p>35 avis</p>
                <div className='plats-share'>
                    <a href=""><img src={commentimage} className='img-plats' alt="" /></a>
                    <a href=""><img src={like} alt="" className='img-plats' /></a>
                    <a href=""><img src={share} alt="" className='img-plats' /></a>
                </div>
                </div>
                </div>
                
        </div>


        <div className='plats-container'>
        <img src={quiche_legume} alt="" />
        <div className='plats-details'>
        <div className='name-plats'>
        <p>Quiche aux légumes</p>
        <p className='plats-time'>20 minutes</p>
        </div>
                <div className='plats-star'>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <p>35 avis</p>
                <div className='plats-share'>
                    <a href=""><img src={commentimage} className='img-plats' alt="" /></a>
                    <a href=""><img src={like} alt="" className='img-plats' /></a>
                    <a href=""><img src={share} alt="" className='img-plats' /></a>
                </div>
                </div>
                </div>
                
        </div>

  </div>


  <div className='share-avis-container'>
    <h1 className='titre-cat'>Partagez votre avis</h1>


    <div className='avis-build'>
      <img src={profil} alt="" />
      <div className='avis-details-profil'>
      <p>Surname Name</p>
      <div className='etoile-categorie'>
                <a href=""><img src={etoilemauve} alt="" /></a>
                <a href=""><img src={etoilemauve} alt="" /></a>
                <a href=""><img src={etoilemauve} alt="" /></a>
                <a href=""><img src={etoilemauve} alt="" /></a>
                 <a href=""><img src={etoilemauve} alt="" /></a>
               
      </div>
      <p className='dateheure-avis'>10/11/2024 16:08</p>
      </div>


      <a className='favs-cat' href=""><img src={etoilejaune} alt="" /></a>
    </div>
    <div className='text-cat-c'>
        <p className='texte-cat'>Un tiramisu absolument délicieux ! La recette est simple et le goût est incroyablement riche. Je l’ai fait pour un dîner entre amis, et tout le monde a adoré !</p>
        </div>

        <div className='avis-build'>
      <img src={profil} alt="" />
      <div className='avis-details-profil'>
      <p>Surname Name</p>
      <div className='etoile-categorie'>
                <a href=""><img src={etoilemauve} alt="" /></a>
                <a href=""><img src={etoilemauve} alt="" /></a>
                <a href=""><img src={etoilemauve} alt="" /></a>
                <a href=""><img src={etoilemauve} alt="" /></a>
                 <a href=""><img src={etoilemauve} alt="" /></a>
               
      </div>
      <p className='dateheure-avis'>10/11/2024 16:08</p>
      </div>


      <a className='favs-cat' href=""><img src={etoilejaune} alt="" /></a>
    </div>
    <div className='text-cat-c'>
        <p className='texte-cat'>Un tiramisu absolument délicieux ! La recette est simple et le goût est incroyablement riche. Je l’ai fait pour un dîner entre amis, et tout le monde a adoré !</p>
        </div>


        <div className='avis-build'>
      <img src={profil} alt="" />
      <div className='avis-details-profil'>
      <p>Surname Name</p>
      <div className='etoile-categorie'>
                <a href=""><img src={etoilemauve} alt="" /></a>
                <a href=""><img src={etoilemauve} alt="" /></a>
                <a href=""><img src={etoilemauve} alt="" /></a>
                <a href=""><img src={etoilemauve} alt="" /></a>
                 <a href=""><img src={etoilemauve} alt="" /></a>
               
      </div>
      <p className='dateheure-avis'>10/11/2024 16:08</p>
      </div>


      <a className='favs-cat' href=""><img src={etoilejaune} alt="" /></a>
    </div>
    <div className='text-cat-c'>
        <p className='texte-cat'>Un tiramisu absolument délicieux ! La recette est simple et le goût est incroyablement riche. Je l’ai fait pour un dîner entre amis, et tout le monde a adoré !</p>
        </div>


        <div className='avis-build'>
      <img src={profil} alt="" />
      <div className='avis-details-profil'>
      <p>Surname Name</p>
      <div className='etoile-categorie'>
                <a href=""><img src={etoilemauve} alt="" /></a>
                <a href=""><img src={etoilemauve} alt="" /></a>
                <a href=""><img src={etoilemauve} alt="" /></a>
                <a href=""><img src={etoilemauve} alt="" /></a>
                 <a href=""><img src={etoilemauve} alt="" /></a>
               
      </div>
      <p className='dateheure-avis'>10/11/2024 16:08</p>
      </div>


      <a className='favs-cat' href=""><img src={etoilejaune} alt="" /></a>
    </div>
    <div className='text-cat-c'>
        <p className='texte-cat'>Un tiramisu absolument délicieux ! La recette est simple et le goût est incroyablement riche. Je l’ai fait pour un dîner entre amis, et tout le monde a adoré !</p>
        </div>
        <div className='commentview-cotnainer'>
        <a className='commentview' href="">Voir tous les commentaires</a>
        </div>
        <div className='notation-cadre'>

          <div className='notation-container'>
          <p>Noter cette recette !</p>
          <a href=""><img src={etoilejaune} alt="" /></a>
          <a href=""><img src={etoilejaune} alt="" /></a>
          <a href=""><img src={etoilejaune} alt="" /></a>
          <a href=""><img src={etoilemauve} alt="" /></a>
          <a href=""><img src={etoilemauve} alt="" /></a>
          </div>
          <textarea className='text-notation'  name="#" id="" placeholder='Votre message ici'></textarea>
          <div className='vld-notation-container'>
          <a className='valider-notation-btn' href="#">Valider</a>
          </div>
        </div>



  </div>


    </div>
    
  )
}


export default catégorie;
