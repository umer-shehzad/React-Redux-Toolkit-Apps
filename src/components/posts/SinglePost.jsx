import React from 'react';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { selectPostById } from '../../redux/postsSlice';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

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

const SinglePost = () => {
    const { postId } = useParams();

    const post = useSelector((state) => selectPostById(state, Number(postId)));

    if (!post){
        return(
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }
    
  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <article>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <p style={{ fontSize: '13px' }}>
          <Link to={`/post/edit/${post.id}`} style={linkStyle} >Edit Post</Link>
            <PostAuthor userId={post.userId} />
            <TimeAgo timestamp={post.date} />
          </p>
          <ReactionButtons post={post} />
        </article>
      </div>
    </div>
  )
}

export default SinglePost
