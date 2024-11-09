import React from 'react'
import './Navbar.css'
import logo from '../../assets/ImageHomePage/logo.png';
import spatula from '../../assets/ImageHomePage/spatula.png';



const Navbar = () => {
  return (
    <div className='navbar'>
      <nav>
        <ul>
          <a href="/homepage"><img src={logo} alt="" /></a>
            <div className='container'>
            <a className='ab' href="/Plats"><li>Plats</li></a>
            <a href=""><li>Nutrition et Santé</li></a>
            <a href=""><li>Pâtes</li></a>
            <a href=""><li>Riz/Nouilles</li></a>
            <a href=""><li>Viandes/Poissons</li></a>
            <a href=""><li>Desserts</li></a>
            </div>
            <div className='input-navbar-container'>
            <input className='input-navbar' type="text" placeholder='Recherche . . . ' />
            <a href=""><img src={spatula} alt="" /></a>
            <a className='connexion-btn' href="./Connexion">Connexion</a>
            </div>
       
        </ul>
      </nav>
    </div>
  )
}

export default Navbar;
