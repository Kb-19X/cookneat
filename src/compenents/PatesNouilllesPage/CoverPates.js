import React, { useState } from 'react';

const CoverPates = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filter, setFilter] = useState('all');
  const [showAllItems, setShowAllItems] = useState(false);

  const products = [
    // Pâtes
    { id: 1, name: 'Spaghetti', category: 'Pâtes' },
    { id: 2, name: 'Penne', category: 'Pâtes' },
    { id: 3, name: 'Tagliatelles', category: 'Pâtes' },
    { id: 4, name: 'Coquillettes', category: 'Pâtes' },
    { id: 5, name: 'Pâtes fraîches', category: 'Pâtes' },
    { id: 6, name: 'Pâtes complètes', category: 'Pâtes' },

    // Nouilles
    { id: 7, name: 'Nouilles de blé', category: 'Nouilles' },
    { id: 8, name: 'Nouilles de riz', category: 'Nouilles' },
    { id: 9, name: 'Nouilles udon', category: 'Nouilles' },
    { id: 10, name: 'Nouilles soba', category: 'Nouilles' },
    { id: 11, name: 'Nouilles aux œufs', category: 'Nouilles' },
    { id: 12, name: 'Nouilles instantanées', category: 'Nouilles' },

    // Riz
    { id: 13, name: 'Riz basmati', category: 'Riz' },
    { id: 14, name: 'Riz complet', category: 'Riz' },
    { id: 15, name: 'Riz blanc', category: 'Riz' },
    { id: 16, name: 'Riz thaï', category: 'Riz' },
    { id: 17, name: 'Riz à sushi', category: 'Riz' },
    { id: 18, name: 'Riz sauvage', category: 'Riz' },
  ];

  const toggleFilters = () => setShowFilters(!showFilters);

  const toggleShowAllItems = () => setShowAllItems(!showAllItems);

  const styles = {
    wrapper: {
      
      fontFamily: "Arial, sans-serif",
      backgroundColor: "var(--secondary-color)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      fontWeight:"200",
    },
    link: {
      textDecoration: "none",
      color: "var(--senary-color)",
      cursor: "pointer",
      marginBottom: "20px",
      fontWeight: "bold",
      fontSize: "18px",
      marginTop: "30px",
    },
    filters: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      fontSize: "12px",
    },
    button: {
      margin: "5px",
      padding: "8px 15px",
      border: "none",
      backgroundColor: "var(--senary-color)",
      cursor: "pointer",
      borderRadius: "5px",
      color: "var(--secondary-color)",
      fontSize: "16px",
    },
    activeButton: {
      backgroundColor: "var(--tertiary-color)",
      color: "white",
    },
    grid: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "10px",
      marginTop: "20px",
    },
    item: {
      backgroundColor: "var(--senary-color)",
      padding: "20px",
      textAlign: "center",
      borderRadius: "10px",
      color: "var(--secondary-color)",
      fontWeight: "600",
      width: "auto",
      fontSize: "14px",
    },
    noProducts: {
      textAlign: "center",
      color: "var(--senary-color)",
      fontSize: "12px",
      fontWeight: "bold",
    },
    toggleMore: {
      marginTop: "20px",
      backgroundColor: "transparent",
      border: "none",
      color: "var(--senary-color)",
      cursor: "pointer",
      fontSize: "14px",
    },
  };

  const filteredProducts = products.filter(product =>
    filter === 'all' || product.category === filter
  );

  const displayedProducts =
    filter === 'all' && !showAllItems ? filteredProducts.slice(0, 5) : filteredProducts;

  return (
    <div style={styles.wrapper}>
      <div className='titre-detox'>
        <h1>Recettes Pâtes / Riz / Nouilles</h1>
      </div>

      <a style={styles.link} onClick={toggleFilters}>
        {showFilters ? 'Masquer les filtres' : 'Afficher les filtres'}
      </a>

      {showFilters && (
        <>
          <div style={styles.filters}>
            <button
              style={{ ...styles.button, ...(filter === 'all' ? styles.activeButton : {}) }}
              onClick={() => setFilter('all')}
            >
              Tous
            </button>
            <button
              style={{ ...styles.button, ...(filter === 'Pâtes' ? styles.activeButton : {}) }}
              onClick={() => setFilter('Pâtes')}
            >
              Pâtes
            </button>
            <button
              style={{ ...styles.button, ...(filter === 'Nouilles' ? styles.activeButton : {}) }}
              onClick={() => setFilter('Nouilles')}
            >
              Nouilles
            </button>
            <button
              style={{ ...styles.button, ...(filter === 'Riz' ? styles.activeButton : {}) }}
              onClick={() => setFilter('Riz')}
            >
              Riz
            </button>
          </div>

          <div style={styles.grid}>
            {displayedProducts.length > 0 ? (
              displayedProducts.map(product => (
                <div key={product.id} style={styles.item}>
                  {product.name}
                </div>
              ))
            ) : (
              <div style={styles.noProducts}>Aucun produit trouvé</div>
            )}
          </div>

          {filter === 'all' && filteredProducts.length > 5 && (
            <button style={styles.toggleMore} onClick={toggleShowAllItems}>
              {showAllItems ? 'Voir moins ▲' : 'Voir plus ▼'}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default CoverPates;
