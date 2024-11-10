import React from 'react'
import './BreadCrumb.css'



const BreadCrumb = () => {
  return (
    <div className='breadcrumb-container'>
      <ul>
        <li><a href="">Acceuil</a></li>
        <li><a href="">Plats</a></li>
        <li><a href="">Nutrition et Santé</a></li>
        <li><a href="">Pâtes</a></li>
        <li><a href="">Riz/Nouilles</a></li>
        <li><a href="">Viandes/Poissons</a></li>

      </ul>
    </div>
  )
}

export default BreadCrumb
