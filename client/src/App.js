// App.jsx
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navbar from './compenents/Homepage/Navbar';
import Footer from './compenents/Homepage/Footer';
import DashboardPage from './compenents/DashboardPage/Dashboard';
import ProductDetails from './compenents/ProductPage/ProductDetails';
import Homepage from './compenents/Homepage/Homepage';
import ProductPage from './compenents/ProductPage';
import Plats from './compenents/Plats';
import EditRecipe from './compenents/EditRecipePage/EditRecipe';
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
import ChefRecipe from './compenents/ChefRecipesPage/ChefRecipe';

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
      { path: '', element: <Homepage /> },
      { path: 'productpage', element: <ProductPage /> },
       
          { path: 'EditRecipe/:id', element: <EditRecipe /> },
      { path: 'productpage/:id', element: <ProductDetails /> }, // 🔧 Affichage d'un plat spécifique
      { path: 'plats', element: <Plats /> },
      { path: 'chefrecipe', element: <ChefRecipe /> },
      { path: 'connexion', element: <Connexion /> },
      { path: 'register', element: <Register /> },
      { path: 'forgetpassword', element: <ForgetPassword /> },
      { path: 'nutritionsanté', element: <NutritionSanté /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'profilpage', element: <ProfilPage /> },
      { path: 'detox', element: <Detox /> },
      { path: 'nogluten', element: <Nogluten /> },
      { path: 'vegan', element: <Vegan /> },
      { path: 'proteine', element: <Proteine /> },
      { path: 'patesnouilles', element: <Patesnouilles /> },
      { path: 'viandes', element: <Viandes /> },
      { path: 'ajoutrecettes', element: <AjoutRecettes /> },
      { path: 'testcomment', element: <TestComment /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
