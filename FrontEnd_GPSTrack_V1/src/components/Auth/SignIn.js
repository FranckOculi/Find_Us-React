import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UseAuth from '../../hooks/UseAuth';
import AuthTheme from '../../utils/AuthTheme';

const SignIn = ({ handleForgotEmail }) => {
  const theme = createTheme(AuthTheme.getTheme());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signInError, setSignInError] = useState(false);

  const { login } = UseAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      const data = {
        mail: email.toLowerCase(),
        motDePasse: password,
      };
      await login(data).catch((error) => {
        console.log(error);
        setSignInError(true);
      });
    }
  };

  return (
    <>
      <form
        action='signIn'
        onSubmit={(e) => handleLogin(e)}
        className='signIn-form'
      >
        <Avatar sx={{ m: 0, bgcolor: 'secondary.main' }} id='lockOut'>
          <LockOutlinedIcon />
        </Avatar>{' '}
        <Typography component='h2' variant='h6' id='signTitle'>
          Sign in
        </Typography>
        <ThemeProvider theme={theme}>
          <TextField
            required
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            inputProps={{
              style: theme.inputTextEmail,
            }}
            InputLabelProps={{
              style: theme.inputLabel,
            }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setSignInError(false);
            }}
          />
          <TextField
            required
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            inputProps={{
              style: theme.inputTextPassword,
            }}
            InputLabelProps={{
              style: theme.inputLabel,
            }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setSignInError(false);
            }}
          />
          <Grid item xs>
            <Link
              href='#'
              variant='body2'
              sx={{
                display: 'inline-block',
                marginLeft: 19,
                marginBottom: 2,
              }}
            >
              Forgot password?
            </Link>
          </Grid>
          <Button type='submit' variant='contained'>
            Sign In
          </Button>
        </ThemeProvider>
        {signInError && (
          <div className='textError'>
            That email and password combination is incorrect
          </div>
        )}
      </form>
    </>
  );
};
export default SignIn;
