import React, { useState } from 'react';
import './TestComment.css';

const TestComment = () => {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleCommentToggle = () => {
    setShowComments(!showComments);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Recette du jour : Osso Buco</h2>

      <div className='react-comment' style={{ margin: '10px 0' }}>
        <button onClick={handleLike}>
          {liked ? '❤️ Liké' : '🤍 Like'}
        </button>
        <button onClick={handleCommentToggle} style={{ marginLeft: '10px' }}>
          💬 Commentaires
        </button>
      </div>

      {showComments && (
        <div style={{ marginTop: '15px', background: '#eee', padding: '10px', borderRadius: '8px' }}>
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              style={{ padding: '5px', width: '70%' }}
            />
            <button type="submit" style={{ padding: '5px 10px', marginLeft: '5px' }}>Envoyer</button>
          </form>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}>
            {comments.map((comment, index) => (
              <li key={index} style={{ background: 'white', marginBottom: '5px', padding: '5px', borderRadius: '4px' }}>
                {comment}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TestComment;
