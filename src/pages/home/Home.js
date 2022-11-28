import './Home.css';
import { getPosts } from '../../api/PostsApi';
import PostList from '../../components/PostList';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  isLoggedIn as isLoggedInAtom,
  selectedPost as selectedPostAtom,
} from '../../atom';

function Home() {
  const [selectedPost, setSelectedPost] = useRecoilState(selectedPostAtom);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPosts() {
      let response = [];
      response = await getPosts();
      setPosts(response[0]);
    }
    fetchPosts();
  }, []);

  function action(postId) {
    navigate('/edit');
    setSelectedPost(postId);
  }

  return (
    <>
      <div className="app-container">
        <div className="post-container">
          <PostList posts={posts} action={action} />
        </div>
      </div>
    </>
  );
}

export default Home;
