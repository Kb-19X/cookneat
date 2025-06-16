import React from 'react';
import './Detoxcover.css';
import gingembre from '../../assets/ImageDetoxPage/gingembre.jpeg';
import soupe_celeri_carotte from '../../assets/ImageDetoxPage/soupe_celeri_carotte_pomme.jpeg';
import Soupe_legumes_curcuma from '../../assets/ImageDetoxPage/Soupe_legumes_curcuma.jpg';
import Soupe_lentilles_tofu from '../../assets/ImageDetoxPage/Soupe_lentilles_tofu.jpg';
import smoothie from '../../assets/ImageDetoxPage/smoothie.jpg';
import clock  from '../../assets/ImageHomePage/clock-one.png';
// import celeri from '../../assets/ImageDetoxPage/celeri.png';
// import tofu  from '../../assets/ImageHomePage/tofu.png';
// import ginger from '../../assets/ImageDetoxPage/ginger.png';
// import curcuma from '../../assets/ImageDetoxPage/curcuma.png';
// import ananas from '../../assets/ImageDetoxPage/ananas.png';
// import lentilles from '../../assets/ImageDetoxPage/lentilles.png';
// import idea from '../../assets/ImageDetoxPage/idea.png';



const Detoxcover = () => {
  return (
    <div className='detox'>


      <div className='detox-container'>

        <div className='titre-detox2'>
        <h1>Recettes détox</h1>
        </div>

        <div className='detox-product'>
        <img src={gingembre} alt="" />


        <div className='detail-detox-product'>
        <h2>Eau de gingembre</h2>
        <p className='p-detox'>Renforcez vos défenses avec l'eau de gingembre, l'infusion immunité par excellence.</p>
        <div className='detail-detox'>
        <p>Boisson - très facile</p>
        <img src={clock} alt="" />
        <p>15 min</p>
        </div>
        </div>

        
        </div>

        <div className='detox-product'>
        <img src={soupe_celeri_carotte} alt="" />


        <div className='detail-detox-product'>
        <h2>Soupe Céleri Carotte Pomme</h2>
        <p className='p-detox'>Un mélange savoureux et réconfortant, riche en vitamines et en fibres, pour nourrir votre corps tout en boostant votre bien-être au quotidien.</p>
        <div className='detail-detox'>
        <p>Soupe - très facile</p>
        <img src={clock} alt="" />
        <p>15 min</p>
        </div>
        </div>

        
        </div>

        <div className='detox-product'>
        <img src={Soupe_legumes_curcuma} alt="" />


        <div className='detail-detox-product'>
        <h2>Soupe aux légumes et curcuma</h2>
        <p className='p-detox'>Une combinaison parfaite de légumes frais et de curcuma épicé, pour un repas riche en saveurs et en bienfaits anti-inflammatoires, qui réchauffe le corps et apaise l'esprit.</p>
        <div className='detail-detox'>
        <p>Soupe - très facile</p>
        <img src={clock} alt="" />
        <p>15 min</p>
        </div>
        </div>

        
        </div>
        
        <div className='detox-product'>
        <img src={Soupe_lentilles_tofu} alt="" />


        <div className='detail-detox-product'>
        <h2>Soupe aux lentilles et tofu</h2>
        <p className='p-detox'>Un mélange nourrissant de lentilles riches en protéines et de tofu onctueux, pour un repas végétarien complet et savoureux, qui vous apporte énergie et bien-être à chaque cuillère.</p>
        <div className='detail-detox'>
        <p>Soupe - très facile</p>
        <img src={clock} alt="" />
        <p>15 min</p>
        </div>
        </div>

        
        </div>



        <div className='detox-product'>
        <img src={smoothie} alt="" />


        <div className='detail-detox-product'>
        <h2>Smoothie vert</h2>
        <p className='p-detox'>Un cocktail rafraîchissant et revitalisant de légumes frais, fruits vitaminés et super-aliments, pour booster votre énergie et renforcer votre santé dès le matin.</p>
        <div className='detail-detox'>
        <p>Boisson - très facile</p>
        <img src={clock} alt="" />
        <p>15 min</p>
        </div>
        </div>

        
        </div>


       

      </div>
    </div>
  )
}

export default Detoxcover;




// # username: dav
// # password: LmJpPtiGBEh7BvXA