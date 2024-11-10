import React from 'react';
import Navbar from '../compenents/Homepage/Navbar';
import BreadCrumb from './PagePlats/BreadCrumb';
import Catégorie from './PagePlats/Catégorie';
import Footer from './Homepage/Footer';



const Plats = () => {
  return (
    <div>
       <Navbar/>
       {/* <BreadCrumb/> */}
       <Catégorie/>
       <Footer/>
    </div>
  )
}

export default Plats;
