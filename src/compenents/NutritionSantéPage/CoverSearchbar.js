import React from 'react';
import './CoverSearchbar.css';
import healthy from '../../assets/ImageNutritionSantéPage/healthy.png';
import bio from '../../assets/ImageNutritionSantéPage/bio.png';
import leaf from '../../assets/ImageNutritionSantéPage/leaf.png';
import wheat from '../../assets/ImageNutritionSantéPage/wheat.png';


const CoverSearchbar = () => {
  return (
    <div className='background-cover'>
    <div className='Cover-Healty'>
        <img src={healthy} alt="" />
        <div className='details-cover-text'>
        <h1>Découvrez notre sélection de recettes 100% nutrition ! </h1>
        <p> Conçues pour vous apporter tous les nutriments, minéraux et vitamines essentiels, ces recettes soutiendront le développement optimal et le fonctionnement harmonieux de votre organisme.</p>
        </div>
        <div className='icon-healthy'>
            <img src={leaf} alt="" />
            <img src={bio} alt="" />
            <img src={wheat} alt="" />
       
        </div>
    </div>
    </div>
  )
}

export default CoverSearchbar;
