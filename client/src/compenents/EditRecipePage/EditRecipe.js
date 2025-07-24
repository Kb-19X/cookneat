import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditRecipe.css";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    ingredients: [],
    steps: [],
    image: "",
  });

  const [message, setMessage] = useState("");

  // 📥 Charger la recette à éditer
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`https://cookneat-server.onrender.com/api/recipes/${id}`);
        setRecipe(res.data);
      } catch (err) {
        console.error("❌ Erreur chargement recette :", err);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://cookneat-server.onrender.com/api/recipes/${id}`,
        recipe,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("✅ Recette mise à jour !");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      console.error("❌ Erreur mise à jour :", err);
      setMessage("❌ Échec de la mise à jour.");
    }
  };

  return (
    <div className="background-edit">

    <div className="edit-recipe-container">
      <h1>✏️ Modifier la recette</h1>
      <form onSubmit={handleUpdate} className="edit-recipe-form">
        <label>Titre</label>
        <input
          type="text"
          name="title"
          value={recipe.title}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={recipe.description}
          onChange={handleChange}
          required
        />

        <label>Image (URL)</label>
        <input
          type="text"
          name="image"
          value={recipe.image}
          onChange={handleChange}
        />

        {message && (
          <p style={{ color: message.startsWith("✅") ? "green" : "red" }}>
            {message}
          </p>
        )}

        <button type="submit">💾 Enregistrer</button>
        <button type="button" onClick={() => navigate("/dashboard")}>
          🔙 Retour
        </button>
      </form>
    </div>
        </div>
  );
};

export default EditRecipe;
