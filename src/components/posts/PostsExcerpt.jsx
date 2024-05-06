import React from 'react';

import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
import { Link } from 'react-router-dom';

const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px', /* Add margin between cards */
    padding: '10px',
    width: '30vw'
  }
  
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  const linkStyle = {
    fontSize: '14px',
    color: '#007bff',
    cursor: 'pointer',
    marginRight: '1rem',
    textDecoration: 'none', 
  }

const PostsExcerpt = ({ post }) => {
  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <article>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <p style={{ fontSize: '13px' }}>
            <Link to={`${post.id}`} style={linkStyle}>View Post</Link>
            <PostAuthor userId={post.userId} />
            <TimeAgo timestamp={post.date} />
          </p>
          <ReactionButtons post={post} />
        </article>
      </div>
    </div>
  )
}

export default PostsExcerpt
