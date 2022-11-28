import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useRecoilState } from 'recoil';
import { Login as LoginUser, Signup } from '../../api/UserApi';
import {
  accessToken as accessTokenAtom,
  isLoggedIn as isLoggedInAtom,
  selectedPost as selectedPostAtom,
} from '../../atom';
import './Login.css';

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [signUp, setSignUp] = React.useState(true);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
  const [selectedPost, setSelectedPost] = useRecoilState(selectedPostAtom);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (signUp) {
      const [message, error] = await Signup(
        data.get('username'),
        data.get('password')
      );
      if (message) {
        alert('Signup successful! You can login now.');
      }
      if (error) {
        alert('Signup failed!');
      }
    }
    if (!signUp) {
      const [token, error] = await LoginUser(
        data.get('username'),
        data.get('password')
      );
      if (token) {
        setAccessToken(token);
        setIsLoggedIn(true);
        alert('Login successful!');
        // TODO: location.state redirect doesnt work...
        // Using navigate instead
        // if (location.state?.from) {
        //   navigate(location.state.from);
        // }
        if (selectedPost) {
          navigate('/edit');
        }
      }
      if (error) {
        console.error(error);
        alert('Login failed!');
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {signUp ? <>Sign Up</> : <>Login</>}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {signUp ? <>Sign Up</> : <>Login</>}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => {
                    setSignUp(!signUp);
                  }}
                >
                  {signUp ? (
                    <>Already have an account? Login</>
                  ) : (
                    <>Don't have an account? Sign Up</>
                  )}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
