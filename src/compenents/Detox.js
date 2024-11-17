import React from 'react';
import Detoxcover from './DetoxPage/Detoxcover';
import Navbar from '../compenents/Homepage/Navbar';
import Footer from './Homepage/Footer';


const detox = () => {
  return (
    <div>
        <Navbar/>
        <Detoxcover/>
        <Footer/>
    </div>
  )
}

export default detox;
