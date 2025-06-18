import React from 'react'

import Body from './Body';
import Recette_du_jour from './Recette_du_jour'

import API_URL from '../config';

fetch(`${API_URL}/recipes`)





const Homepage = () => {
  return (
    <div>
     
      <Recette_du_jour />
      <Body />
    
    </div>
  )
}

export default Homepage;
