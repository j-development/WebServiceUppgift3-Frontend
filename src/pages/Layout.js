import { Outlet, Link, useNavigate } from 'react-router-dom';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button } from '@mui/material';

function appBarLabel(goHome, goLogin, goCreate) {
  return (
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        <Button onClick={goHome}>Blogspot</Button>
        <Button onClick={goLogin}>Login</Button>
        <Button onClick={goCreate}>New Post</Button>
      </Typography>
    </Toolbar>
  );
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

const Layout = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  const goLogin = () => {
    navigate('/login');
  };

  const goCreate = () => {
    navigate('/edit');
  };

  return (
    <>
      <Stack spacing={2} sx={{ flexGrow: 1 }}>
        <ThemeProvider theme={darkTheme}>
          <AppBar position="static" color="primary">
            {appBarLabel(goHome, goLogin, goCreate)}
          </AppBar>
        </ThemeProvider>
      </Stack>
      <Outlet />
    </>
  );
};

export default Layout;
