import React, { useState } from 'react';

const CoverPates = () => {
  const [showFilters, setShowFilters] = useState(false); // Pour afficher ou masquer les filtres
  const [filter, setFilter] = useState('all'); // Par défaut, on voit tous les produits

  const products = [
    { id: 1, name: 'Spaghetti', category: 'italienne' },
    { id: 2, name: 'Nouilles Udon', category: 'asiatique' },
    { id: 3, name: 'Pâtes de riz', category: 'sans-gluten' },
    { id: 4, name: 'Penne', category: 'italienne' },
    { id: 5, name: 'Nouilles Soba', category: 'asiatique' },
  ];

  // Filtrer les produits en fonction de la catégorie sélectionnée
  const filteredProducts = products.filter(product =>
    filter === 'all' || product.category === filter
  );

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const styles = {
    wrapper: {
      padding: "50px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "var(--secondary-color)",
    },
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
    },
    filters: {
      marginBottom: "20px",
      display: "flex",
      flexDirection: "row", // Afficher les boutons en colonne
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
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
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
    },
    noProducts: {
      textAlign: "center",
      color: "var(--senary-color)",
      fontSize: "16px",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.wrapper}>
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
              style={{ ...styles.button, ...(filter === 'italienne' ? styles.activeButton : {}) }}
              onClick={() => setFilter('italienne')}
            >
              Italiennes
            </button>
            <button
              style={{ ...styles.button, ...(filter === 'asiatique' ? styles.activeButton : {}) }}
              onClick={() => setFilter('asiatique')}
            >
              Asiatiques
            </button>
            <button
              style={{ ...styles.button, ...(filter === 'sans-gluten' ? styles.activeButton : {}) }}
              onClick={() => setFilter('sans-gluten')}
            >
              Sans gluten
            </button>
          </div>

          <div style={styles.grid}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <div key={product.id} style={styles.item}>
                  {product.name}
                </div>
              ))
            ) : (
              <div style={styles.noProducts}>Aucun produit trouvé</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CoverPates;
