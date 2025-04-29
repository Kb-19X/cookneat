import React from 'react';
import Viandes from './compenents/Viandes/Viandes';
import Navbar from '../compenents/Homepage/Navbar';
import Footer from './Homepage/Footer';

const ViandesPage = () => {
  return (
    <div>
      <Navbar />
      <Viandes />
      <Footer />
    </div>
  )
};

export default ViandesPage;
