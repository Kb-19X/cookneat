import React from 'react'
import Homepage from './compenents/Homepage/Homepage'; 
import ProductPage from './compenents/ProductPage';
import Plats from './compenents/Plats';
import Connexion from './compenents/Connexion';
import Register from './compenents/Register';
import ForgetPassword from './compenents/ForgetPassword';
import { createBrowserRouter, RouterProvider, NavLink, Outlet } from 'react-router-dom';


function Root() {
  return (
    <div>
      <nav>
        <NavLink to="/Homepage">Home</NavLink> | 
        <NavLink to="/ProductPage">Product</NavLink> | 
        <NavLink to="/plats">Plats</NavLink> | 
        <NavLink to="/connexion">Connexion</NavLink> | 
        <NavLink to="/register">Register</NavLink> | 
        <NavLink to="/ForgetPassword">Forget Password</NavLink>
      </nav>
      {/* Permet de rendre les sous-routes ici */}
      <Outlet />
    </div>
  );
}

// Définir les routes dans createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
  
    children: [
      { path: 'Homepage', element: <Homepage /> },
      { path: 'ProductPage', element: <ProductPage /> },
      { path: 'plats', element: <Plats /> },
      { path: 'connexion', element: <Connexion /> },
      { path: 'register', element: <Register /> },
      { path: 'ForgetPassword', element: <ForgetPassword /> },
    ],
  },
]);

// Fonction principale App
function App() {
  return <RouterProvider router={router} />;
}

export default App;
