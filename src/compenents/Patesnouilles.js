import React from 'react'
import Navbar from '../compenents/Homepage/Navbar';
import CoverPates from './PatesNouilllesPage/CoverPates';
import Feculentproduct from './PatesNouilllesPage/Feculentproduct';
import Footer from './Homepage/Footer';


const Patesnouilles = () => {
  return (
    <div>
      <Navbar/>
      <CoverPates/>
      <Feculentproduct/>
      <Footer/>
    </div>
  )
}

export default Patesnouilles;
