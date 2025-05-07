import React, { useState } from 'react';
import './AjoutRecettes.css';

const AjoutRecettes = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [ingredients, setIngredients] = useState(['']);
  const [steps, setSteps] = useState([{ text: '', image: null }]);

  const handleMainImageChange = e => {
    const file = e.target.files[0];
    if (file) setMainImage(URL.createObjectURL(file));
  };

  const handleIngredientChange = (index, value) => {
    const newIng = [...ingredients];
    newIng[index] = value;
    setIngredients(newIng);
  };

  const addIngredient = () => setIngredients([...ingredients, '']);
  const removeIngredient = i => setIngredients(ingredients.filter((_, idx) => idx !== i));

  const handleStepChange = (index, field, value) => {
    const newSteps = [...steps];
    newSteps[index][field] = field === 'image' && value ? URL.createObjectURL(value) : value;
    setSteps(newSteps);
  };

  const addStep = () => setSteps([...steps, { text: '', image: null }]);
  const removeStep = i => setSteps(steps.filter((_, idx) => idx !== i));

  const handleSubmit = e => {
    e.preventDefault();
    const recipeData = { title, description, mainImage, ingredients, steps };
    console.log('Nouvelle recette :', recipeData);
    // ici on enverrait recipeData au back-end
  };

  return (
    <div className="ajout-recettes">
      <h1 className='titre-ajout-recettes'>Réalisez et partagez vos créations culinaires !</h1>
      <form onSubmit={handleSubmit} className="form-recette">
        <label className='titre-de-recettes'>
          Titre de la recette
          <input className='input-recette-1' type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        </label>

        <label>
          Description
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} />
        </label>

        <label className='img-principale'>
          Image principale
          <input className='input-img-p' type="file" accept="image/*" onChange={handleMainImageChange} />
        </label>
        {mainImage && <img src={mainImage} alt="Prévisualisation" className="preview-main" />}

        <div className="ingredients-section">
          <h2>Ingrédients</h2>
          {ingredients.map((ing, idx) => (
            <div key={idx} className="ingredient-item">
              <input
                type="text"
                value={ing}
                onChange={e => handleIngredientChange(idx, e.target.value)}
                placeholder={`Ingrédient ${idx + 1}`} />
              <button type="button" onClick={() => removeIngredient(idx)}>Supprimer</button>
            </div>
          ))}
          <button type="button" onClick={addIngredient}>+ Ajouter un ingrédient</button>
        </div>

        <div className="steps-section">
          <h2>Étapes</h2>
          {steps.map((step, idx) => (
            <div key={idx} className="step-item">
              <textarea
                value={step.text}
                onChange={e => handleStepChange(idx, 'text', e.target.value)}
                placeholder={`Étape ${idx + 1}`}
                rows={2}
              />
              <input
                type="file"
                accept="image/*"
                onChange={e => handleStepChange(idx, 'image', e.target.files[0])}
              />
              {step.image && <img src={step.image} alt={`Étape ${idx + 1}`} className="preview-step" />}
              <button type="button" onClick={() => removeStep(idx)}>Supprimer l'étape</button>
            </div>
          ))}
          <button type="button" onClick={addStep}>+ Ajouter une étape</button>
        </div>

        <button type="submit" className="btn-submit">Valider la recette</button>
      </form>
    </div>
  );
};

export default AjoutRecettes;