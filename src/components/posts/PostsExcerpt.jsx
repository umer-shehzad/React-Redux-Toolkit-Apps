import React from 'react';

import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
import { Link } from 'react-router-dom';

import { cardStyle, containerStylePost, linkStylePost } from '../../constants/Style';

const PostsExcerpt = ({ post }) => {
  return (
    <div style={containerStylePost}>
      <div style={cardStyle}>
        <article>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <p style={{ fontSize: '13px' }}>
            <Link to={`${post.id}`} style={linkStylePost}>View Post</Link>
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
