import React from 'react'
import Navbar from '../compenents/Homepage/Navbar';
import Footer from './Homepage/Footer';
import ProductDetails from './ProductPage/ProductDetails';


const ProductPage = () => {
  return (
    <div>
       <Navbar/>
       <ProductDetails/>
       <Footer/>
    </div>
  )
}

export default ProductPage;
