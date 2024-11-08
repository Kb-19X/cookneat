import React from 'react'
import './ProductDetails.css'
import Risotto  from '../../assets/ImageHomePage/Risotto alla Milanese.jpg';
import Risotto2  from '../../assets/ImageHomePage/Risotto2.webp';
import Risotto3  from '../../assets/ImageHomePage/Risotto3.webp';
import Risotto4  from '../../assets/ImageHomePage/Risotto4.jpg';
import Risotto5  from '../../assets/ImageHomePage/Risotto5.webp';
import clock  from '../../assets/ImageHomePage/clock-one.png';
import hat  from '../../assets/ImageHomePage/chef-hat.png';
import coin  from '../../assets/ImageHomePage/coin.png';

import comment from '../../assets/ImageHomePage/comment.png';
import like from '../../assets/ImageHomePage/like.png';
import share from '../../assets/ImageHomePage/share.png';

import etoilejaune from '../../assets/ImageHomePage/etoilejaune.png';
import etoilemauve from '../../assets/ImageHomePage/etoilemauve.png';



const ProductDetails = () => {
  return (
    <div> 
    <div className='ProductDetails'>
    <div className='Product-container'>
    
            <h1>Risotto alla Milanese</h1>
            <div className='details-cadre-container'>
            <img className='img-principal-details' src={Risotto2} alt="" />
            <div className='bank-img-details'>
                <img src={Risotto3} alt="" />
                <img src={Risotto4} alt="" />
                <img src={Risotto5} alt="" />
              
            </div>

            <div className='info-time-product'>

                <img src={clock} alt="" />
                <p> 50 min</p>
                <img src={hat} alt="" />
                <p>Moyen</p>
                <img src={coin} alt="" />
                <p>Bon marché</p>
            </div>
            <div class="stars-product">
                <p>56</p>
                <p className='avis'>avis</p>
                <span className='first-stars'>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
               
                <div className='com-recetteday'>
                <a href="#"><img src={like} alt="" /></a>
                <a href="#"><img src={comment} alt="" /></a>
                <a href="#"><img src={share} alt="" /></a>
                </div>
            </div>

            <div className='ingredient-container'>
            <h1>Ingrédients</h1>

            <div className='ingredients-grid'>
                <div className='ingredients-left'>
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

            <div className='ingredients-right'>
            <p>300 g </p>
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
                     </div>

            <div className='prepa-container'>
            <h1>Préparation</h1>
            <div className='prepa-texte-container'>
            <h2>ÉTAPE 1</h2>
            <p>Faites chauffer le bouillon de bœuf dans une petite casserole. Prélevez-en l’équivalent d’un verre, et ajoutez-y le safran, afin de le faire infuser pendant la préparation du risotto. Conservez le reste du bouillon au chaud.</p>
            <h2>ÉTAPE 2</h2>
            <p>Faites revenir la moelle de bœuf dans une grande casserole afin d’en graisser le fond. Ajoutez l’oignon et faites-le suer pendant quelques minutes sans coloration, jusqu’à ce qu’il soit tendre.</p>
            <h2>ÉTAPE 3</h2>
            <p>Ajoutez le riz. Faites-le « nacrer » pendant 2 min en mélangeant régulièrement.</p>
            <h2>ÉTAPE 4</h2>
            <p>Lorsque les grains sont translucides, déglacez avec le vin blanc et laissez-le s’évaporer complètement.</p>
            <h2>ÉTAPE 5</h2>
            <p>Mouillez ensuite progressivement (louche par louche) avec le bouillon de la casserole au fur et à mesure de l’absorption. Au bout de 15 min de cuisson, ajoutez le verre de bouillon au safran infusé. Poursuivez la cuisson 2 à 4 min de plus. N’oubliez pas de mélanger régulièrement pendant toute la cuisson du risotto : le riz ne doit pas accrocher au fond de la casserole.</p>
            <h2>ÉTAPE 6</h2>
            <p>Lorsque le riz est cuit, incorporez le beurre en morceaux et le parmesan râpé pour lier la préparation. Poivrez.</p>
            <h2>ÉTAPE 7</h2>
            <p>Hors du feu, couvrez la casserole pour laisser reposer le risotto 2 min avant de le servir.</p>
            <h2>ÉTAPE 8</h2>
            <p>Dégustez ce risotto bien chaud, seul ou en accompagnement d’un osso buco.</p>
            </div>
            </div>

        <div>
            <h1>Donnez-nous votre avis !</h1>
        </div>
            <div className='avis-product-detail'>
                <img src={etoilemauve} alt="" />
                <img src={etoilemauve} alt="" />
                <img src={etoilemauve} alt="" />
                <img src={etoilemauve} alt="" />
                <img src={etoilemauve} alt="" />
                <p className='barre-recette'>|</p>
                <p className='recette-critique'>Que pensez-vous de cette recette ?</p>
            </div>
                <textarea className='textarea-avis' name="" id="" placeholder='Votre commentaire ici'></textarea>
                <a className='envoyer-avis' href="">Envoyer</a>


                <div className='astuce-container'>
                    <h3 className='astuce-texte'>Astuces</h3>
                    <p>Si vous n’en trouvez pas, la moelle de bœuf peut être remplacée sans problème par une autre matière grasse comme une noix de beurre ou un peu d’huile d’olive.</p>
                </div>
    </div>

    </div>
    </div>
  )
}

export default ProductDetails
