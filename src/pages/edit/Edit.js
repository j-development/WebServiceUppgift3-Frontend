import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Box from '@mui/material/Box';
import './Edit.css';
import {
  accessToken as accessTokenAtom,
  selectedPost as selectedPostAtom,
} from '../../atom';
import { getPostById, updatePost } from '../../api/PostsApi';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Edit() {
  const [selectedPost, setSelectedPost] = useRecoilState(selectedPostAtom);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
  const [content, setContent] = useState('');
  const [post, setPost] = useState({ creator: '', title: '', content: '' });
  const navigate = useNavigate();

  const onSaveClick = (event) => {
    updatePost(selectedPost, content, accessToken);
    setSelectedPost(null);
    navigate('/');
  };

  useEffect(() => {
    async function fetchPost() {
      let response = await getPostById(selectedPost);
      setPost(response[0]);
    }
    fetchPost().catch((err) => console.log(err));
  }, []);

  return (
    <div className="edit-container">
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
    </div>
  );
}
