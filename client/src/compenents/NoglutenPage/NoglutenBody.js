
import React from 'react';
import './NoglutenBody.css';


import cantonais from '../../assets/ImageNoglutenPage/cantonais.jpg';
import cookies from '../../assets/ImageNoglutenPage/cookies.jpg';
import gratin from '../../assets/ImageNoglutenPage/gratin.jpg';
import nantais from '../../assets/ImageNoglutenPage/nantais.webp';
import pain from '../../assets/ImageNoglutenPage/pain.jpg';
import scone from '../../assets/ImageNoglutenPage/scone.jpg';


import clock  from '../../assets/ImageHomePage/clock-one.png';
// import celeri from '../../assets/ImageDetoxPage/celeri.png';
// import tofu  from '../../assets/ImageHomePage/tofu.png';
// import idea from '../../assets/ImageDetoxPage/idea.png';


// import oeuf from '../../assets/ImageNoglutenPage/oeuf.png';
// import douce from '../../assets/ImageNoglutenPage/douce.png';
// import amande from '../../assets/ImageNoglutenPage/amande.png';





const NoglutenBody = () => {
  return (
    <div className='detox'>

  <div className='detox-container'>

    <div className='titre-detox'>
    <h1>Recettes No Gluten</h1>
    </div>

    <div className='detox-product'>
    <img src={cantonais} alt="" />


    <div className='detail-detox-product'>
    <h2>Riz cantonais</h2>
    <p className='p-detox'>Un classique revisité sans gluten, avec du riz parfumé, des légumes croquants, des œufs moelleux et une touche d’exotisme.</p>
    <div className='detail-detox'>
    <p>Plat - très facile</p>
    <img src={clock} alt="" />
    <p className='timing-recette'>15 min</p>
    </div>
    </div>

    
    </div>

    <div className='detox-product'>
    <img src={cookies} alt="" />


    <div className='detail-detox-product'>
    <h2>Cookies</h2>
    <p className='p-detox'>Des cookies dorés et croustillants à l'extérieur, fondants à l'intérieur, parfaits pour un plaisir gourmand et sans compromis.</p>
    <div className='detail-detox'>
    <p>Biscuit - très facile</p>
    <img src={clock} alt="" />
    <p>30 min</p>
    </div>
    </div>

    
    </div>

    <div className='detox-product'>
    <img src={gratin} alt="" />


    <div className='detail-detox-product'>
    <h2>Gratin aux patatrs douces</h2>
    <p className='p-detox'>Un gratin généreux, alliant la douceur des patates douces et une texture fondante, idéal pour un repas réconfortant.</p>
    <div className='detail-detox'>
    <p>Plat - très facile</p>
    <img src={clock} alt="" />
    <p>1 heures 40 minutes</p>
    </div>
    </div>

    
    </div>
    
    <div className='detox-product'>
    <img src={nantais} alt="" />


    <div className='detail-detox-product'>
    <h2>Gâteau Nantais</h2>
    <p className='p-detox'>Un dessert raffiné et sans gluten, aux saveurs intenses de rhum et d’amandes, pour une pause sucrée incontournable.</p>
    <div className='detail-detox'>
    <p>Dessert - très facile</p>
    <img src={clock} alt="" />
    <p>15 min</p>
    </div>
    </div>

    
    </div>



    <div className='detox-product'>
    <img src={pain} alt="" />


    <div className='detail-detox-product'>
    <h2>Pain</h2>
    <p className='p-detox'>Un pain moelleux et savoureux, parfait pour accompagner tous vos repas, sans jamais compromettre le goût.</p>
    <div className='detail-detox'>
    <p>Boulangerie - très facile</p>
    <img src={clock} alt="" />
    <p>1 heure 40 minutes</p>
    </div>
    </div>

    
    </div>



    <div className='detox-product'>
    <img src={scone} alt="" />


    <div className='detail-detox-product'>
    <h2>Scones</h2>
    <p className='p-detox'>De délicieux scones légers et friables, parfaits à tartiner pour un petit-déjeuner ou un goûter réussi.</p>
    <div className='detail-detox'>
    <p>Pâtisserie - très facile</p>
    <img src={clock} alt="" />
    <p>55 min</p>
    </div>
    </div>

    
    </div>

   

  </div>
</div>
)
};
  

export default NoglutenBody;
