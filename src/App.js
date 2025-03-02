import React from 'react';
import Homepage from './compenents/Homepage/Homepage';
import ProductPage from './compenents/ProductPage';
import Plats from './compenents/Plats';
import Connexion from './compenents/Connexion';
import Register from './compenents/Register';
import ForgetPassword from './compenents/ForgetPassword';
import NutritionSanté from './compenents/NutritionSanté';
import Detox from './compenents/Detox';
import Nogluten from './compenents/Nogluten';
import Vegan from './compenents/Vegan';
import Proteine from './compenents/Proteine';
import Patesnouilles from './compenents/Patesnouilles';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

function Root() {
  return (
    <div>
      {/* <nav>
        <NavLink to="/Homepage">Home</NavLink> | 
        <NavLink to="/ProductPage">Product</NavLink> | 
        <NavLink to="/plats">Plats</NavLink> | 
        <NavLink to="/connexion">Connexion</NavLink> | 
        <NavLink to="/register">Register</NavLink> | 
        <NavLink to="/ForgetPassword">Forget Password</NavLink> | 
        <NavLink to="/NutritionSanté">NutritionSanté</NavLink>
      </nav> */}
      {/* Permet de rendre les sous-routes ici */}
      <Outlet />
    </div>
  );
}

// Définir les routes dans createBrowserRouter avec Root comme layout
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,  // Ajout du composant Root ici
    children: [
      { path: '/', element: <Homepage /> },
      { path: 'ProductPage', element: <ProductPage /> },
      { path: 'plats', element: <Plats /> },
      { path: 'connexion', element: <Connexion /> },
      { path: 'register', element: <Register /> },
      { path: 'ForgetPassword', element: <ForgetPassword /> },
      { path: 'NutritionSanté', element: <NutritionSanté /> },
      { path: 'Detox', element: <Detox /> },
      { path: 'Nogluten', element: <Nogluten /> },
      { path: 'Vegan', element: <Vegan /> },
      { path: 'Proteine', element: <Proteine /> },
      { path: 'Patesnouilles', element: <Patesnouilles /> },
    ],
  },
]);

// Fonction principale App
function App() {
  return <RouterProvider router={router} />;
}

export default App;
