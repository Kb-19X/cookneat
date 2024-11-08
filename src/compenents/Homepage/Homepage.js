import React from 'react'

import Navbar from './Navbar'; 
import Body from './Body';
import Recette_du_jour from './Recette_du_jour'
import Footer from './Footer'; 




const Homepage = () => {
  return (
    <div>
      <Navbar />
      <Recette_du_jour />
      <Body />
      <Footer />
    </div>
  )
}

export default Homepage;
