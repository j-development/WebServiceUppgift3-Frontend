import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { deletePost } from '../api/PostsApi';
import { accessToken as accessTokenAtom } from '../atom';
import { useRecoilState } from 'recoil';

export default function Post({ post, action }) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);

  function handleEditClick() {
    action(post.title);
  }
  function handleDeleteClick() {
    deletePost(post.title, accessToken);
  }

  return (
    <div className="post">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {post.creator}
          </Typography>
          <Typography variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography variant="body2">{post.content}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleEditClick}>
            Click to edit
          </Button>
          <Button variant="outlined" color="error" onClick={handleDeleteClick}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
