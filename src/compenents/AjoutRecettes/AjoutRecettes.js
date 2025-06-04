import React, { useState } from 'react';
import axios from 'axios';
import './AjoutRecettes.css';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const AjoutRecettes = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [mainImageName, setMainImageName] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [steps, setSteps] = useState([{ text: '', image: null }]);

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
      setMainImageName(file.name);
    }
  };

  const handleIngredientChange = (index, value) => {
    const newIng = [...ingredients];
    newIng[index] = value;
    setIngredients(newIng);
  };

  const addIngredient = () => setIngredients([...ingredients, '']);
  const removeIngredient = (i) => setIngredients(ingredients.filter((_, idx) => idx !== i));

  const handleStepChange = (index, field, value) => {
    const newSteps = [...steps];
    newSteps[index][field] = field === 'image' ? value : value;
    setSteps(newSteps);
  };

  const addStep = () => setSteps([...steps, { text: '', image: null }]);
  const removeStep = (i) => setSteps(steps.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert("Connecte-toi pour ajouter une recette !");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', mainImage);
    formData.append('ingredients', JSON.stringify(ingredients));
    formData.append('steps', JSON.stringify(steps.map((s) => ({ text: s.text }))));

    steps.forEach((step) => {
      if (step.image) {
        formData.append(`stepImages`, step.image);
      }
    });

    try {
      await axios.post('http://localhost:5000/api/recipes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      alert('✅ Recette ajoutée !');
      window.location.href = '/Plats';
    } catch (err) {
      console.error('❌ Erreur : ', err.response?.data || err.message);
      alert("Erreur lors de l'envoi de la recette.");
    }
  };

  return (
    <div className="ajout-recettes">
      <h1 className="titre-ajout-recettes">
        Réalisez et partagez vos créations culinaires !
      </h1>
      <form onSubmit={handleSubmit} className="form-recette">
        <label>
          Titre de la recette
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <label>
          Image principale
          <div className="input-img-p-wrapper">
            <input
              type="file"
              accept="image/*"
              onChange={handleMainImageChange}
              className="input-img-p"
              id="mainImageUpload"
            />
            <label htmlFor="mainImageUpload" className="custom-file-label">
              Choisir une image
            </label>
          </div>
          {mainImageName && (
            <p style={{ marginTop: '0.5rem', fontStyle: 'italic', color: 'var(--senary-color)' }}>
              📎 Fichier sélectionné : <strong>{mainImageName}</strong>
            </p>
          )}
        </label>

        <div className="ingredients-section">
          <h2>Ingrédients</h2>
          {ingredients.map((ing, idx) => (
            <div key={idx} className="ingredient-item">
              <input
                type="text"
                value={ing}
                onChange={(e) => handleIngredientChange(idx, e.target.value)}
              />
              <IconButton
                color="error"
                onClick={() => removeIngredient(idx)}
                aria-label="Supprimer ingrédient"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <button type="button" onClick={addIngredient}>
            + Ajouter un ingrédient
          </button>
        </div>

        <div className="steps-section">
          <h2>Étapes</h2>
          {steps.map((step, idx) => (
            <div key={idx} className="step-item">
              <textarea
                value={step.text}
                onChange={(e) => handleStepChange(idx, 'text', e.target.value)}
                placeholder={`Étape ${idx + 1}`}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleStepChange(idx, 'image', e.target.files[0])}
              />
              <IconButton
                color="error"
                onClick={() => removeStep(idx)}
                aria-label="Supprimer étape"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <button type="button" onClick={addStep}>
            + Ajouter une étape
          </button>
        </div>

        <button type="submit" className="btn-submit">
          Valider la recette
        </button>
      </form>
    </div>
  );
};

export default AjoutRecettes;
