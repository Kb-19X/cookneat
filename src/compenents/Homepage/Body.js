import React from 'react'
import './Body.css'

import Risotto from '../../assets/ImageHomePage/Risotto alla Milanese.jpg';
import comment from '../../assets/ImageHomePage/comment.png';
import bruschetta from '../../assets/ImageHomePage/bruschetta.jpg';
import ossobuco from '../../assets/ImageHomePage/osoobuco.jpg';
import tiramisu from '../../assets/ImageHomePage/tiramisu.jpg';
import italie from '../../assets/ImageHomePage/drapeau_italie.png';
import pizza4fromages from '../../assets/ImageHomePage/pizza4fromages.jpeg';
import chaud from '../../assets/ImageHomePage/chaud.png';
import froid from '../../assets/ImageHomePage/froid.png';


import france from '../../assets/ImageHomePage/france.png';
import blanquette from '../../assets/ImageHomePage/blanquette_veau.jpg';
import boeuf_bourg from '../../assets/ImageHomePage/boeuf_bourguignon.jpg';
import creme_brulee from '../../assets/ImageHomePage/creme_brulee.jpeg';
import quiche from '../../assets/ImageHomePage/quiche.webp';
import tartiflette from '../../assets/ImageHomePage/tartiflette.jpg';

import commentimage from '../../assets/ImageHomePage/comment.png';
import like from '../../assets/ImageHomePage/like.png';
import share from '../../assets/ImageHomePage/share.png';
import star from '../../assets/ImageHomePage/star.png';



const body = () => {
  return (
    <div className='container-body'>
        <div className='section-body'>
          
            <h1>Spécialités Italiennes</h1>
            <img src={italie} alt="" />
         
         
        </div>

        <div className='bloc-body-container'>
            <div className='bloc-body'>
               <a href="./ProductPage"> <img className='img-bloc-body' src={Risotto} alt="" /></a>
               <div className='froidchaud-container'>
                <p>Risotto alla Milanese</p>
                <img className='genre-plat' src={chaud} alt="" />
                </div>
                <div className='container-bloc-time'>
                    <p className='bloc-time'>50 minutes</p>
                    <div class="avis-etoile">
                    <div className='avis-texte'>
                    <p>22</p>
                    <p className='avis'>avis</p>
                    </div>
                <div className='avis-star'>
                <span className='etoile-img'>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                </div>
              
            </div>
            <div className='card-com-share'>
                <a href="#"><img src={star} alt="" /></a>
                <a href="#"><img src={comment} alt="" /></a>
                <a href="#"><img src={share} alt="" /></a>
                </div>
                </div>
            </div>
            <div className='bloc-body'>
               <a href=""> <img className='img-bloc-body' src={bruschetta } alt="" /></a>
               <div className='froidchaud-container'>
                <p>Bruschetta</p>
                <img className='genre-plat' src={froid} alt="" />
                </div>
                <div className='container-bloc-time'>
                    <p className='bloc-time'>15 minutes</p>
                    <div class="avis-etoile">
                    <div className='avis-texte'>
                    <p>22</p>
                    <p className='avis'>avis</p>
                    </div>
                <div className='avis-star'>
                <span className='etoile-img'>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                </div>
              
            </div>
            <div className='card-com-share'>
                <a href="#"><img src={star} alt="" /></a>
                <a href="#"><img src={comment} alt="" /></a>
                <a href="#"><img src={share} alt="" /></a>
                </div>
                </div>
            </div>
         
            <div className='bloc-body'>
               <a href=""> <img className='img-bloc-body' src={ossobuco} alt="" /></a>
               <div className='froidchaud-container'>
               <p>Osso Buco</p>
                <img className='genre-plat' src={chaud} alt="" />
                </div>  
                <div className='container-bloc-time'>
                    <p className='bloc-time'>1 heures 35 minutes</p>
                    <div class="avis-etoile">
                    <div className='avis-texte'>
                    <p>22</p>
                    <p className='avis'>avis</p>
                    </div>
                <div className='avis-star'>
                <span className='etoile-img'>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                </div>
              
            </div>
            <div className='card-com-share'>
                <a href="#"><img src={star} alt="" /></a>
                <a href="#"><img src={comment} alt="" /></a>
                <a href="#"><img src={share} alt="" /></a>
                </div>
                </div>
            </div>
          
            <div className='bloc-body'>
               <a href=""> <img className='img-bloc-body' src={tiramisu} alt="" /></a>
               <div className='froidchaud-container'>
               <p>Tiramisu</p>
                <img className='genre-plat' src={froid} alt="" />
                </div>
                <div className='container-bloc-time'>
                    <p className='bloc-time'>20 minutes</p>
                    <div class="avis-etoile">
                    <div className='avis-texte'>
                    <p>22</p>
                    <p className='avis'>avis</p>
                    </div>
                <div className='avis-star'>
                <span className='etoile-img'>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                </div>
              
            </div>
            <div className='card-com-share'>
                <a href="#"><img src={star} alt="" /></a>
                <a href="#"><img src={comment} alt="" /></a>
                <a href="#"><img src={share} alt="" /></a>
                </div>
                </div>
            </div>

            <div className='bloc-body'>
               <a href=""> <img className='img-bloc-body' src={pizza4fromages} alt="" /></a>
                    <div className='froidchaud-container'>
                <p>Pizza 4 fromages</p>
                <img className='genre-plat' src={chaud} alt="" />
                </div>
                <div className='container-bloc-time'>
                    <p className='bloc-time'>45 minutes</p>
                    <div class="avis-etoile">
                    <div className='avis-texte'>
                    <p>22</p>
                    <p className='avis'>avis</p>
                    </div>
                <div className='avis-star'>
                <span className='etoile-img'>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                </div>
              
            </div>
            <div className='card-com-share'>
                <a href="#"><img src={star} alt="" /></a>
                <a href="#"><img src={comment} alt="" /></a>
                <a href="#"><img src={share} alt="" /></a>
                </div>
                </div>
                
            </div>

            </div>

            <div className='section-body'>
          
          <h1>Spécialités Françaises</h1>
          <img src={france} alt="" />
       
       
      </div>

      <div className='bloc-body-container-bot'>
          <div className='bloc-body'>
             <a href=""> <img className='img-bloc-body' src={quiche} alt="" /></a>
             <div className='froidchaud-container'>
              <p>Quiche lorraine</p>
              <img className='genre-plat' src={chaud} alt="" />
              </div>
              <div className='container-bloc-time'>
                  <p className='bloc-time'>55 minutes</p>
                  <div class="avis-etoile">
                    <div className='avis-texte'>
                    <p>22</p>
                    <p className='avis'>avis</p>
                    </div>
                <div className='avis-star'>
                <span className='etoile-img'>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                </div>
              
            </div>
            <div className='card-com-share'>
                <a href="#"><img src={star} alt="" /></a>
                <a href="#"><img src={comment} alt="" /></a>
                <a href="#"><img src={share} alt="" /></a>
                </div>
              </div>
          </div>
          <div className='bloc-body'>
             <a href=""> <img className='img-bloc-body' src={blanquette } alt="" /></a>
             <div className='froidchaud-container'>
              <p>Blanquette de veau</p>
              <img className='genre-plat' src={chaud} alt="" />
              </div>
              <div className='container-bloc-time'>
                  <p className='bloc-time'>2 heures 15 minutes</p>
                  <div class="avis-etoile">
                    <div className='avis-texte'>
                    <p>22</p>
                    <p className='avis'>avis</p>
                    </div>
                <div className='avis-star'>
                <span className='etoile-img'>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                </div>
              
            </div>
            <div className='card-com-share'>
                <a href="#"><img src={star} alt="" /></a>
                <a href="#"><img src={comment} alt="" /></a>
                <a href="#"><img src={share} alt="" /></a>
                </div>
              </div>
          </div>
       
          <div className='bloc-body'>
             <a href=""> <img className='img-bloc-body' src={tartiflette} alt="" /></a>
             <div className='froidchaud-container'>
             <p>Tartiflette</p>
              <img className='genre-plat' src={chaud} alt="" />
              </div>  
              <div className='container-bloc-time'>
                  <p className='bloc-time'>1 heures 10 minutes</p>
                  <div class="avis-etoile">
                    <div className='avis-texte'>
                    <p>22</p>
                    <p className='avis'>avis</p>
                    </div>
                <div className='avis-star'>
                <span className='etoile-img'>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                </div>
              
            </div>
            <div className='card-com-share'>
                <a href="#"><img src={star} alt="" /></a>
                <a href="#"><img src={comment} alt="" /></a>
                <a href="#"><img src={share} alt="" /></a>
                </div>
              </div>
            
          </div>
        
          <div className='bloc-body'>
             <a href=""> <img className='img-bloc-body' src={boeuf_bourg} alt="" /></a>
             <div className='froidchaud-container'>
             <p>bœuf Bourguignon</p>
              <img className='genre-plat' src={chaud} alt="" />
              </div>
              <div className='container-bloc-time'>
                  <p className='bloc-time'>3 heures 20 minutes</p>
                  <div class="avis-etoile">
                    <div className='avis-texte'>
                    <p>22</p>
                    <p className='avis'>avis</p>
                    </div>
                <div className='avis-star'>
                <span className='etoile-img'>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                </div>
              
            </div>
            <div className='card-com-share'>
                <a href="#"><img src={star} alt="" /></a>
                <a href="#"><img src={comment} alt="" /></a>
                <a href="#"><img src={share} alt="" /></a>
                </div>
              </div>
          </div>

          <div className='bloc-body'>
             <a href=""> <img className='img-bloc-body' src={creme_brulee} alt="" /></a>
                  <div className='froidchaud-container'>
              <p>Crème brûlée</p>
              <img className='genre-plat' src={froid} alt="" />
              </div>
              <div className='container-bloc-time'>
                  <p className='bloc-time'>55 minutes</p>
                  <div class="avis-etoile">
                    <div className='avis-texte'>
                    <p>22</p>
                    <p className='avis'>avis</p>
                    </div>
                <div className='avis-star'>
                <span className='etoile-img'>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                </div>
              
            </div>
            <div className='card-com-share'>
                <a href="#"><img src={star} alt="" /></a>
                <a href="#"><img src={comment} alt="" /></a>
                <a href="#"><img src={share} alt="" /></a>
                </div>
              </div>
          </div>

          </div>
    </div>
  )
}

export default body
