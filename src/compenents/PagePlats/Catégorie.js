import React from 'react'
import './Catégorie.css'
import macaroni from '../../assets/ImagePlatsPage/macaroni.jpg';
import boule_jambon_fromage from '../../assets/ImagePlatsPage/boule_jambon_fromage.jpg';
import macarons from '../../assets/ImagePlatsPage/macarons.jpeg';
import pancake from '../../assets/ImagePlatsPage/pancake.webp';
import choux_bruxelles from '../../assets/ImagePlatsPage/choux_bruxelles.webp';
import quiche_legume from '../../assets/ImagePlatsPage/quiche_legume.webp';
import muffins from '../../assets/ImagePlatsPage/muffins.jpg';


import commentimage from '../../assets/ImageHomePage/comment.png';
import like from '../../assets/ImageHomePage/like.png';
import share from '../../assets/ImageHomePage/share.png';


const catégorie = () => {
  return (
    <div className='Plats'>

      <div className='plats-container'>
        <img src={macaroni} alt="" />
        <div className='plats-details'>
        <p className='plats-text'>Macaronis</p>
        <p className='plats-text'>25 minutes</p>
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
        <p>Macarons</p>
        <p>50 minutes</p>
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
        <p>Pancakes</p>
        <p>20 minutes</p>
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
        <img src={choux_bruxelles} alt="" />
        <div className='plats-details'>
        <p>Choux de Bruxelles</p>
        <p>25 minutes</p>
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
  )
}

export default catégorie
