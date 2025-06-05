import React, { useState, useEffect } from 'react';
import './Body.css';
import Risotto from '../../assets/ImageHomePage/Risotto alla Milanese.jpg';
import bruschetta from '../../assets/ImageHomePage/bruschetta.jpg';
import ossobuco from '../../assets/ImageHomePage/osoobuco.jpg';
import pesto_alla_genovese from '../../assets/ImageFeculentPage/pesto_alla_genovese.webp';
import pates_thon from '../../assets/ImageFeculentPage/pates_thon.jpg';
import pate_ricotta from '../../assets/ImageFeculentPage/pate_ricotta.jpeg';
import etoilejaune from '../../assets/ImageHomePage/etoilejaune.png';
import countries from '../../assets/ImageHomePage/countries.png';
import profil from '../../assets/ImagePlatsPage/profil.png';
import commentIcon from '../../assets/ImagePlatsPage/comment.png';
import like from '../../assets/ImagePlatsPage/like.png';
import share from '../../assets/ImagePlatsPage/share.png';

const recipes = [
  { id: 1, image: Risotto, title: "Risotto alla Milanese", time: "30 minutes" },
  { id: 2, image: bruschetta, title: "Bruschetta", time: "15 minutes" },
  { id: 3, image: ossobuco, title: "Ossobuco", time: "2 heures" },
  { id: 4, image: pesto_alla_genovese, title: "Pesto alla Genovese", time: "20 minutes" },
  { id: 5, image: pates_thon, title: "Pâtes au thon", time: "25 minutes" },
  { id: 6, image: pate_ricotta, title: "Pâtes à la ricotta", time: "30 minutes" }
];

const Body = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', rating: 5, text: '', recipeId: '' });

  const handleCommentChange = (field, value) => {
    if (field === 'recipeId') value = parseInt(value);
    setNewComment(prev => ({ ...prev, [field]: value }));
  };

  const fetchComments = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/comments');
      const data = await res.json();
      setComments(data);
    } catch (error) {
      console.error('Erreur lors du chargement des commentaires :', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const submitComment = async () => {
    if (!newComment.name.trim() || !newComment.text.trim() || !newComment.recipeId) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment),
      });

      if (!res.ok) throw new Error('Erreur lors de l’envoi');

      await res.json();
      alert('Commentaire envoyé !');
      setNewComment({ name: '', rating: 5, text: '', recipeId: '' });
      fetchComments();
    } catch (error) {
      console.error('Erreur en postant le commentaire :', error);
      alert('Erreur lors de l’envoi du commentaire.');
    }
  };

  const getAverageRating = (recipeId) => {
    const ratings = comments.filter(c => c.recipeId === recipeId).map(c => c.rating);
    if (ratings.length === 0) return 0;
    return ratings.reduce((a, b) => a + b, 0) / ratings.length;
  };

  return (
    <div className='plats-body-container'>
      <div className="plats-titres">
        <img src={countries} alt="Countries" />
        <h1>Plats</h1>
        <img src={countries} alt="Countries" />
      </div>

      <div className="recipes-container">
        {recipes.map((recipe) => {
          const averageRating = Math.round(getAverageRating(recipe.id));
          const recipeComments = comments.filter(c => c.recipeId === recipe.id);

          return (
            <div key={recipe.id} className="recipe-card">
              <div className="recipe-image">
                <img src={recipe.image} alt={recipe.title} />
              </div>
              <div className="recipe-info">
                <h3>{recipe.title}</h3>
                <p className="recipe-time">⏱ {recipe.time}</p>
                <div className="recipe-rating">
                  {[...Array(averageRating)].map((_, i) => (
                    <img key={i} src={etoilejaune} alt="Star" style={{ width: '20px', marginRight: '5px' }} />
                  ))}
                  <span> ({recipeComments.length} avis)</span>
                </div>
                <div className="recipe-actions">
                  <img src={like} alt="Like" />
                  <img src={commentIcon} alt="Comment" />
                  <img src={share} alt="Share" />
                </div>
                <div className="comments-list">
                  {recipeComments.map((comment) => (
                    <div key={comment._id} className="comment-item">
                      <img src={profil} alt="User" />
                      <div>
                        <p><strong>{comment.name}</strong> - {new Date(comment.createdAt).toLocaleDateString()}</p>
                        <p>{'⭐'.repeat(comment.rating)}</p>
                        <p>{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="comment-section-global">
        <h2 className='plats-commentez'>Commentez un plat !</h2>
        <select onChange={(e) => handleCommentChange('recipeId', e.target.value)} value={newComment.recipeId}>
          <option value="">Sélectionnez un plat</option>
          {recipes.map((recipe) => (
            <option key={recipe.id} value={recipe.id}>{recipe.title}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Votre nom"
          value={newComment.name}
          onChange={(e) => handleCommentChange('name', e.target.value)}
        />
        <textarea
          placeholder="Votre commentaire"
          value={newComment.text}
          onChange={(e) => handleCommentChange('text', e.target.value)}
        ></textarea>

        <select value={newComment.rating} onChange={(e) => handleCommentChange('rating', parseInt(e.target.value))}>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n} étoile{n > 1 ? 's' : ''}</option>
          ))}
        </select>
        <button onClick={submitComment}>Envoyer</button>
      </div>
    </div>
  );
};

export default Body;
