// src/App.jsx

import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import Navbar from './compenents/Homepage/Navbar';
import Footer from './compenents/Homepage/Footer';

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
import Viandes from './compenents/ViandesPage/Viandes';
import Proteine from './compenents/Proteine';
import Patesnouilles from './compenents/Patesnouilles';
import AjoutRecettes from './compenents/AjoutRecette';
import TestComment from './compenents/TestCommentPage/TestComment';
import ProfilPage from './compenents/ProfilPage/Profil';

function Root() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '/', element: <Homepage /> },
      { path: 'ProductPage', element: <ProductPage /> },
      { path: 'plats', element: <Plats /> },
      { path: 'connexion', element: <Connexion /> },
      { path: 'register', element: <Register /> },
      { path: 'ForgetPassword', element: <ForgetPassword /> },
      { path: 'NutritionSanté', element: <NutritionSanté /> },
      { path: 'profilPage', element: <ProfilPage /> },
      { path: 'Detox', element: <Detox /> },
      { path: 'Nogluten', element: <Nogluten /> },
      { path: 'Vegan', element: <Vegan /> },
      { path: 'Proteine', element: <Proteine /> },
      { path: 'Patesnouilles', element: <Patesnouilles /> },
      { path: 'Viandes', element: <Viandes /> },
      { path: 'AjoutRecettes', element: <AjoutRecettes /> },
      { path: 'TestComment', element: <TestComment /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
