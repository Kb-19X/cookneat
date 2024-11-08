import React from 'react'
import HomePage from './compenents/Homepage/Homepage'; 
import ProductPage from './compenents/ProductPage';
import Plats from './compenents/Plats';
import Connexion from './compenents/Connexion';
import Register from './compenents/Register';
import ForgetPassword from './compenents/ForgetPassword';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    
    <Router>
    <div>
 
      <Routes>
        <Route path="/Homepage" element={<HomePage />} />
        <Route path="/plats" element={<Plats />} />
        <Route path="/ProductPage" element={<ProductPage />} />
        <Route path="/Connexion" element={<Connexion />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        
      </Routes>
    </div>
  </Router>
);
};

export default App
