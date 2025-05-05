import React, { useState } from 'react';
import './Viandes.css';
import '../Homepage/Navbar.css';
import insta from '../../assets/ImageHomePage/instagram.png';
import reddit from '../../assets/ImageHomePage/reddit.png';
import twitter from '../../assets/ImageHomePage/twitter.png';
import bowl_quinoa from '../../assets/ImageVeganPage/bowl_quinoa.webp';
import curry from '../../assets/ImageVeganPage/curry.png';
import nouilles from '../../assets/ImageVeganPage/nouilles.webp';
import Padthai from '../../assets/ImageVeganPage/Padthai.jpg';
import clock from '../../assets/ImageHomePage/clock-one.png';
import celeri from '../../assets/ImageDetoxPage/celeri.png';
import idea from '../../assets/ImageDetoxPage/idea.png';
import oeuf from '../../assets/ImageNoglutenPage/oeuf.png';
import douce from '../../assets/ImageNoglutenPage/douce.png';
import amande from '../../assets/ImageNoglutenPage/amande.png';
import comment from '../../assets/ImagePlatsPage/comment.png';
import like from '../../assets/ImagePlatsPage/like.png';
import share from '../../assets/ImagePlatsPage/share.png';
import logo from '../../assets/ImageHomePage/logo.png';
import spatula from '../../assets/ImageHomePage/spatula.png';

const Viandes = () => {
  const [showComments, setShowComments] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filter, setFilter] = useState('all');
  
  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const products = [
    // contenu dans le filtrage

    { id: 1, name: 'Bœuf', category: 'Viandes rouges' },
    { id: 2, name: 'Agneau', category: 'Viandes rouges' },
    { id: 3, name: 'Gibier', category: 'Viandes rouges' },
    { id: 4, name: 'Poulet', category: 'Viandes blanches' },

    { id: 5, name: 'Dinde', category: 'Viandes blanches' },
    { id: 6, name: 'Veau', category: 'Viandes blanches' },
    { id: 7, name: 'Lapin', category: 'Viandes blanches' },

    { id: 8, name: 'Saucisses', category: 'Charcuterie et viandes transformées' },
    { id: 9, name: 'Jambon', category: 'Charcuterie et viandes transformées' },
    { id: 10, name: 'Lardons / Bacon', category: 'Charcuterie et viandes transformées' },
    { id: 11, name: 'Spécialités', category: 'Charcuterie et viandes transformées' },
    
  
  ];

  const filteredProducts = products.filter(product =>
    filter === 'all' || product.category === filter
  );

  const styles = {
    link: {
      textDecoration: "none",
      color: "var(--senary-color)",
      cursor: "pointer",
      marginBottom: "30px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      fontSize: "18px",
      marginTop:"30px"
    },
    filters: {
      marginBottom: "20px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      margin: "5px",
      padding: "8px 15px",
      border: "none",
      backgroundColor: "var(--senary-color)",
      cursor: "pointer",
      borderRadius: "5px",
      color: "var(--secondary-color)",
    },
    activeButton: {
      backgroundColor: "var(--tertiary-color)",
      color: "white",
    },
    grid: {
      display: "flex",
      justifyContent:"center",
      alignItems:"center",
      
      gap: "10px",
      marginTop: "20px",
      padding: "20px",
    },
    item: {
      backgroundColor: "var(--senary-color)",
      padding: "20px",
      textAlign: "center",
      borderRadius: "10px",
      color: "var(--secondary-color)",
      fontWeight: "600",
    },
    noProducts: {
      textAlign: "center",
      color: "var(--senary-color)",
      fontSize: "16px",
      fontWeight: "bold",
    },
  };

  return (
    <>
      <div className="navbar">
        <nav>
          <div className="burger-menu">
            <span></span><span></span><span></span>
          </div>
          <ul className="menu">
            <li><a href="/"><img src={logo} alt="Logo" /></a></li>
            <div className="container">
              <li><a className="ab" href="/Plats">Plats</a></li>
              <li><a href="/NutritionSanté">Nutrition et Santé</a></li>
              <li><a href="/patesnouilles">Pâtes / Riz / Nouilles</a></li>
              <li><a href="/Viandes">Viandes / Poissons</a></li>
              <li><a href="/desserts">Desserts</a></li>
            </div>
            <div className="input-navbar-container">
              <input className="input-navbar" type="text" placeholder="Recherche . . ." />
              <a href="#"><img src={spatula} alt="Recherche" /></a>
              <a className="connexion-btn" href="/Connexion">Connexion</a>
            </div>
          </ul>
        </nav>

        <div className='detox-container'>
          <div className='titre-detox'>
            <h1>Recettes Viandes / Poissons</h1>
          </div>  {/* Filtres */}
          <a style={styles.link} onClick={toggleFilters} className='afficher-filtres'>
            {showFilters ? 'Masquer les filtres' : 'Afficher les filtres'}
          </a>
          {showFilters && (
            <>
              <div style={styles.filters}>
                <button style={{ ...styles.button, ...(filter === 'all' ? styles.activeButton : {}) }} onClick={() => setFilter('all')}>Tous</button>
                <button style={{ ...styles.button, ...(filter === 'Viandes rouges' ? styles.activeButton : {}) }} onClick={() => setFilter('Viandes rouges')}>Viandes rouges</button>
                <button style={{ ...styles.button, ...(filter === 'Viandes blanches' ? styles.activeButton : {}) }} onClick={() => setFilter('Viandes blanches')}>Viandes blanches</button>
                <button style={{ ...styles.button, ...(filter === 'Charcuterie et viandes transformées' ? styles.activeButton : {}) }} onClick={() => setFilter('Charcuterie et viandes transformées')}>Charcuterie et viandes transformées</button>
              </div>

              <div style={styles.grid}>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(product => (
                    <div key={product.id} style={styles.item}>{product.name}</div>
                  ))
                ) : (
                  <div style={styles.noProducts}>Aucun produit trouvé</div>
                )}
              </div>
            </>
          )}
          {/* Recette 1 */}
          <div className='detox-product'>
            <img src={bowl_quinoa} alt="" />
            <div className='detail-detox-product'>
              <h2>Poulet au curry</h2>
              <p className='p-detox'>Des morceaux de poulet tendres cuits dans une sauce onctueuse au lait de coco, parfumée au curry et aux épices.</p>
              <div className='detail-detox'>
                <div className='time-vegan'><img src={clock} alt="" /><p>15 min</p></div>
                <div className='btn-vegan'>
                  <img src={like} alt="" /><img src={comment} alt="" /><img src={share} alt="" />
                </div>
              </div>
              <div className='comments-section'>
                <button className='toggle-button' onClick={toggleComments}>
                  {showComments ? "Masquer les commentaires" : "Voir les commentaires"}
                </button>
                <div className={`comments-hidden ${showComments ? 'open' : ''}`}>
                  <p><strong>Jean :</strong> Super recette !</p>
                  <p><strong>Marie :</strong> Très bon et facile à faire.</p>
                  <p><strong>Paul :</strong> J'ai ajouté du poulet, excellent !</p>
                </div>
              </div>
            </div>
          </div>

          {/* Autres recettes */}
          <div>
          <div className='detox-product'>
            <img src={bowl_quinoa} alt="" />
            <div className='detail-detox-product'>
              <h2>Poulet au curry</h2>
              <p className='p-detox'>Des morceaux de poulet tendres cuits dans une sauce onctueuse au lait de coco, parfumée au curry et aux épices.</p>
              <div className='detail-detox'>
                <div className='time-vegan'><img src={clock} alt="" /><p>15 min</p></div>
                <div className='btn-vegan'>
                  <img src={like} alt="" /><img src={comment} alt="" /><img src={share} alt="" />
                </div>
              </div>
              <div className='comments-section'>
                <button className='toggle-button' onClick={toggleComments}>
                  {showComments ? "Masquer les commentaires" : "Voir les commentaires"}
                </button>
                <div className={`comments-hidden ${showComments ? 'open' : ''}`}>
                  <p><strong>Jean :</strong> Super recette !</p>
                  <p><strong>Marie :</strong> Très bon et facile à faire.</p>
                  <p><strong>Paul :</strong> J'ai ajouté du poulet, excellent !</p>
                </div>
              </div>
            </div>
          </div></div>
          <div className='detox-product'>
            <img src={bowl_quinoa} alt="" />
            <div className='detail-detox-product'>
              <h2>Poulet au curry</h2>
              <p className='p-detox'>Des morceaux de poulet tendres cuits dans une sauce onctueuse au lait de coco, parfumée au curry et aux épices.</p>
              <div className='detail-detox'>
                <div className='time-vegan'><img src={clock} alt="" /><p>15 min</p></div>
                <div className='btn-vegan'>
                  <img src={like} alt="" /><img src={comment} alt="" /><img src={share} alt="" />
                </div>
              </div>
              <div className='comments-section'>
                <button className='toggle-button' onClick={toggleComments}>
                  {showComments ? "Masquer les commentaires" : "Voir les commentaires"}
                </button>
                <div className={`comments-hidden ${showComments ? 'open' : ''}`}>
                  <p><strong>Jean :</strong> Super recette !</p>
                  <p><strong>Marie :</strong> Très bon et facile à faire.</p>
                  <p><strong>Paul :</strong> J'ai ajouté du poulet, excellent !</p>
                </div>
              </div>
            </div>
          </div>
           <div className='detox-product'>
            <img src={bowl_quinoa} alt="" />
            <div className='detail-detox-product'>
              <h2>Poulet au curry</h2>
              <p className='p-detox'>Des morceaux de poulet tendres cuits dans une sauce onctueuse au lait de coco, parfumée au curry et aux épices.</p>
              <div className='detail-detox'>
                <div className='time-vegan'><img src={clock} alt="" /><p>15 min</p></div>
                <div className='btn-vegan'>
                  <img src={like} alt="" /><img src={comment} alt="" /><img src={share} alt="" />
                </div>
              </div>
              <div className='comments-section'>
                <button className='toggle-button' onClick={toggleComments}>
                  {showComments ? "Masquer les commentaires" : "Voir les commentaires"}
                </button>
                <div className={`comments-hidden ${showComments ? 'open' : ''}`}>
                  <p><strong>Jean :</strong> Super recette !</p>
                  <p><strong>Marie :</strong> Très bon et facile à faire.</p>
                  <p><strong>Paul :</strong> J'ai ajouté du poulet, excellent !</p>
                </div>
              </div>
            </div>
          </div>

        

         
        </div>
        <div className='footer-container'>

<div className='footer-left'>
<img src={logo} alt="" />
<h1>Liens Utiles</h1>
<p>Bien être et santé</p>
<a href="https://www.nutrition.fr/">https://www.nutrition.fr/</a>
<p>Apprendre à cuisiner en vidéo</p>
<a href="https://www.youtube.com/user/foodwishes">https://www.youtube.com/user/foodwishes</a>
<p>Livres de cuisine</p>
<a href="https://www.fnac.com/">https://www.fnac.com/</a>
</div>

<div className='footer-mid'>
    <h1>Catégories</h1>
    <a href="">Nutrition et santé</a>
    <a href="">Pâtes</a>
    <a href="">Riz/nouilles</a>
    <a href="">Viandes/poissons</a>
    <a href="">Desserts</a>
    <p>&copy; 2025 CookNeat. Tous droits réservés.</p>
</div>

<div className='footer-right'>
    <h1 className='contact-title'>Contact</h1>
    <p>CookNeat@gmail.com</p>
    <p>04 785 113 548</p>
    <p className='news'>Inscris-toi à notre newsletter pour ne rien rater des nouvelles recettes !</p>
    <div className='newletter'>
    <input className='input-navbar' type="text" placeholder='E-mail' />
    <a href="">Valider</a>
    </div>
    <div className='rsx'>
        <a href=""><img src={insta} alt="" /></a>
        <a href=""><img src={reddit} alt="" /></a>
        <a href=""><img src={twitter} alt="" /></a>
    </div>
</div>


 </div>
      </div>

    </>
  );
};

export default Viandes;
