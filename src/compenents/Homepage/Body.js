import React, { useState } from 'react';
import './Body.css';

import Risotto from '../../assets/ImageHomePage/Risotto alla Milanese.jpg';
import bruschetta from '../../assets/ImageHomePage/bruschetta.jpg';
import ossobuco from '../../assets/ImageHomePage/osoobuco.jpg';
import pesto_alla_genovese from '../../assets/ImageFeculentPage/pesto_alla_genovese.webp';
import pates_thon from '../../assets/ImageFeculentPage/pates_thon.jpg';
import pate_ricotta from '../../assets/ImageFeculentPage/pate_ricotta.jpeg';
import etoilejaune from '../../assets/ImageHomePage/etoilejaune.png';
import etoilemauve from '../../assets/ImageHomePage/etoilemauve.png';
import countries from '../../assets/ImageHomePage/countries.png';
import profil from '../../assets/ImagePlatsPage/profil.png';
import commentIcon from '../../assets/ImagePlatsPage/comment.png';
import like from '../../assets/ImagePlatsPage/like.png';
import share from '../../assets/ImagePlatsPage/share.png';

const recipes = [
    { id: 1, image: Risotto, title: "Risotto alla Milanese", time: "30 minutes", rating: 5, reviews: 12 },
    { id: 2, image: bruschetta, title: "Bruschetta", time: "15 minutes", rating: 4, reviews: 8 },
    { id: 3, image: ossobuco, title: "Ossobuco", time: "2 heures", rating: 5, reviews: 15 },
    { id: 4, image: pesto_alla_genovese, title: "Pesto alla Genovese", time: "20 minutes", rating: 5, reviews: 10 },
    { id: 5, image: pates_thon, title: "Pâtes au thon", time: "25 minutes", rating: 4, reviews: 7 },
    { id: 6, image: pate_ricotta, title: "Pâtes à la ricotta", time: "30 minutes", rating: 5, reviews: 9 }
];

const Body = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ name: '', rating: 5, text: '', recipeId: null });

    const handleCommentChange = (field, value) => {
        setNewComment((prev) => ({ ...prev, [field]: value }));
    };

    const submitComment = () => {
        if (!newComment.name.trim() || !newComment.text.trim()) {
            alert('Le nom et le commentaire ne peuvent pas être vides.');
            return;
        }
        const recipeTitle = recipes.find(r => r.id === newComment.recipeId)?.title || 'Inconnu';
        const newEntry = {
            ...newComment,
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            recipeTitle,
        };
        setComments((prev) => [...prev, newEntry]);
        setNewComment({ name: '', rating: 5, text: '', recipeId: null });
    };

    return (
        <div className='plats-body-container'>
            <div className="plats-titres">
                <img src={countries} alt="Countries" />
                <h1>Plats</h1>
                <img src={countries} alt="Countries" />
            </div>
            <div className="recipes-container">
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="recipe-card">
                        <div className="recipe-image">
                            <img src={recipe.image} alt={recipe.title} />
                        </div>
                        <div className="recipe-info">
                            <h3>{recipe.title}</h3>
                            <p className="recipe-time">{recipe.time}</p>
                            <div className="recipe-rating">
                                {Array(recipe.rating).fill().map((_, index) => (
                                    <img key={index} src={etoilejaune} alt="Star" style={{ width: '20px', marginRight: '5px' }} />
                                ))}
                                <span> ({recipe.reviews} reviews)</span>
                            </div>
                            <div className="recipe-actions">
                                <img src={like} alt="Like" />
                                <img src={commentIcon} alt="Comment" />
                                <img src={share} alt="Share" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="comment-section-global">
                <h2 className='plats-commentez'>Commentez un plat !</h2>
                <select onChange={(e) => handleCommentChange('recipeId', parseInt(e.target.value))} value={newComment.recipeId || ''}>
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
                <label>Note :</label>
                <select value={newComment.rating} onChange={(e) => handleCommentChange('rating', parseInt(e.target.value))}>
                    {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>{n} étoile{n > 1 ? 's' : ''}</option>
                    ))}
                </select>
                <button onClick={submitComment}>Envoyer</button>
            </div>
            <div className="comments-list">
                <h2 className='commentaires-add'>Commentaires</h2>
                {comments.map((comment) => (
                    <div key={comment.id} className="comment-item">
                        <img src={profil} alt="User" />
                        <div>
                            <p><strong>{comment.name}</strong> - {comment.date}</p>
                            <p>Plat : <strong>{comment.recipeTitle}</strong></p>
                            <p>Note : {'⭐'.repeat(comment.rating)}</p>
                            <p>{comment.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Body;
