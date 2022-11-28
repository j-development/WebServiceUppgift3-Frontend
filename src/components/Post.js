import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Post({ post, action }) {
  function handlePostClick() {
    action(post.title);
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
          <Button size="small" onClick={handlePostClick}>
            Click to edit
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
