import React, { useState } from "react";

const Filters = ({ onFilterChange }) => {
  const [category, setCategory] = useState("");
  const [time, setTime] = useState("");
  const [chefOnly, setChefOnly] = useState(false);
  const [ingredient, setIngredient] = useState("");

  const handleFilterChange = () => {
    onFilterChange({ category, time, chefOnly, ingredient });
  };

  return (
    <div className="filters-container">
      <h3>Filtres</h3>

      <div className="filter-group">
        <label>Catégorie :</label>
        <select value={category} onChange={(e) => { setCategory(e.target.value); handleFilterChange(); }}>
          <option value="">Toutes</option>
          <option value="pates">Pâtes</option>
          <option value="detox">Détox</option>
          <option value="proteines">Protéines</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Temps total :</label>
        <select value={time} onChange={(e) => { setTime(e.target.value); handleFilterChange(); }}>
          <option value="">Tous</option>
          <option value="15">Moins de 15 min</option>
          <option value="30">15-30 min</option>
          <option value="60">Plus de 30 min</option>
        </select>
      </div>



      <div className="filter-group">
        <label>Ingrédient :</label>
        <input
          type="text"
          placeholder="Ex: poulet"
          value={ingredient}
          onChange={(e) => { setIngredient(e.target.value); handleFilterChange(); }}
        />
      </div>
    </div>
  );
};

export default Filters;
