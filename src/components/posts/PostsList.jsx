import React, { memo } from 'react';

import { useSelector } from 'react-redux';

import { selectAllPosts, getPostsStatus, getPostsError } from '../../redux/postsSlice';
import PostsExcerpt from './PostsExcerpt';

const PostsList = () => {

  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  let content;
  if (postsStatus === 'loading') {
    content = <p>loading...</p>
  } else if (postsStatus === 'succeeded') {
    const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => <PostsExcerpt key={post.id} post={post} />)
    // content = posts.map((post) => <PostsExcerpt key={post.id} post={post} />)
  } else if (postsStatus === 'failed') {
    content = <p>{postsError}</p>
  }

  return (
    <section>
      {content}
    </section>
  )
};

export default memo(PostsList)

