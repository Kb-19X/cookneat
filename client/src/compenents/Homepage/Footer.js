import React from 'react';
import './Footer.css';

import insta from '../../assets/ImageHomePage/instagram.png';
import twitter from '../../assets/ImageHomePage/twitter.png';
import reddit from '../../assets/ImageHomePage/reddit.png';

import logo2 from "../../assets/ImageHomePage/logo2.svg";

const Footer = () => {
  return (
    <div>
     <div className='footer-container'>

    <div className='footer-left'>
    <img src={logo2} alt="" />
    <h1>Liens Utiles</h1>
    <p>Bien être et santé</p>
    <a href="https://www.nutrition.fr/">https://www.nutrition.fr/</a>
    <p>Apprendre à cuisiner en vidéo</p>
    <a href="https://www.youtube.com/user/foodwishes">https://www.youtube.com/user/foodwishes</a>
    <p>Livres de cuisine</p>
    <a href="https://www.fnac.com/">https://www.fnac.com/</a>
    </div>

    <div className='footer-mid'>
        <h1>Catégories</h1>
        <a href="/">Nutrition et santé</a>
        <a href="/">Pâtes</a>
        <a href="/">Riz/nouilles</a>
        <a href="/">Viandes/poissons</a>
        <a href="/">Desserts</a>
        <p>&copy; 2025 CookNeat. Tous droits réservés.</p>
    </div>

    <div className='footer-right'>
        <h1 className='contact-title'>Contact</h1>
        <p>CookNeat@gmail.com</p>
        <p>04 785 113 548</p>
        <p className='news'>Inscris-toi à notre newsletter pour ne rien rater des nouvelles recettes !</p>
        <div className='newletter'>
        <input className='input-navbar' type="text" placeholder='E-mail' />
        <a href="/">Valider</a>
        </div>
        <div className='rsx'>
            <a href="/"><img src={insta} alt="" /></a>
            <a href="/"><img src={reddit} alt="" /></a>
            <a href="/"><img src={twitter} alt="" /></a>
        </div>
    </div>


     </div>
    </div>
  )
}

export default Footer;
