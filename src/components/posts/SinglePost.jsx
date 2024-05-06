import React from 'react';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { selectPostById } from '../../redux/postsSlice';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

import { cardStyle, containerStylePost, linkStylePost } from '../../constants/Style';

  

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
    <div style={containerStylePost}>
      <div style={cardStyle}>
        <article>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <p style={{ fontSize: '13px' }}>
          <Link to={`/post/edit/${post.id}`} style={linkStylePost} >Edit Post</Link>
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
