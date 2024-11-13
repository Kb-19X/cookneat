import React from 'react';
import Navbar from '../compenents/Homepage/Navbar';
import CoverSearchbar from './NutritionSantéPage/CoverSearchbar';
import CarousselHealthy from './NutritionSantéPage/CarousselHealthy';
import Footer from './Homepage/Footer';


const NutritionSanté = () => {
  return (
    <div>
        <Navbar/>
        <CoverSearchbar/>
        <CarousselHealthy/>
        <Footer/>
    </div>
  )
}

export default NutritionSanté
