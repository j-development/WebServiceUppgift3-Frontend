import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { createPost, getPostById, updatePost } from '../../api/PostsApi';
import {
  accessToken as accessTokenAtom,
  selectedPost as selectedPostAtom,
} from '../../atom';
import './Edit.css';

export default function Edit() {
  const [selectedPost, setSelectedPost] = useRecoilState(selectedPostAtom);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [post, setPost] = useState({ creator: '', title: '', content: '' });
  const navigate = useNavigate();

  const onSaveClick = (event) => {
    updatePost(selectedPost, content, accessToken);
    setSelectedPost(null);
    navigate('/');
  };

  const onCreateClick = (event) => {
    createPost(title, content, accessToken);
    setSelectedPost(null);
    setTitle('');
    setContent('');
    navigate('/');
  };

  useEffect(() => {
    if (selectedPost) {
      async function fetchPost() {
        let response = await getPostById(selectedPost);
        setPost(response[0]);
      }
      fetchPost().catch((err) => console.log(err));
    }
  }, [selectedPost]);

  const postCreate = () => {
    return (
      <div className="post-create">
        <Card sx={{ minWidth: 350 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            ></Typography>
            <Typography variant="h6" component="div"></Typography>
            <Typography variant="h6"></Typography>
            <TextField
              fullWidth
              id="content"
              label="Input Title"
              name="content"
              onChange={(event) => setTitle(event.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="content"
              label="Input content"
              name="content"
              onChange={(event) => setContent(event.target.value)}
            />
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              variant="outlined"
              size="small"
              onClick={onCreateClick}
            >
              Click to Save
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  };

  const postEdit = () => {
    return (
      <div className="post-edit">
        <Card sx={{ minWidth: 350 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {post.creator}
            </Typography>
            <Typography variant="h6" component="div">
              {post.title}
            </Typography>
            <Typography variant="h6">{post.content}</Typography>
            <TextField
              fullWidth
              id="content"
              label="Input new content"
              name="content"
              onChange={(event) => setContent(event.target.value)}
            />
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              variant="outlined"
              size="small"
              onClick={onSaveClick}
            >
              Click to Save
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  };

  return (
    <div className="edit-container">
      {selectedPost ? postEdit() : postCreate()}
    </div>
  );
}
