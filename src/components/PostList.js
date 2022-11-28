import React from 'react';
import Post from '../components/Post';

export default function PostList({ posts, action }) {
  return posts.map((post) => {
    return <Post key={post.title} action={action} post={post} />;
  });
}
