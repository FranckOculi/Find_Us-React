import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { isStrongPassword } from 'validator';
import UseAuth from '../../hooks/UseAuth';
import AuthTheme from '../../utils/AuthTheme';

const SignUp = () => {
  const theme = createTheme(AuthTheme.getTheme());
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [passwordError, setPasswordError] = useState(false);

  const [signUpError, setSignUpError] = useState(false);
  const { createAccount } = UseAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!isStrongPassword(password)) {
      setPasswordError(true);
    } else if (userName && email && password) {
      const data = {
        pseudo: userName,
        mail: email.toLowerCase(),
        motDePasse: password,
      };

      return await createAccount(data).catch((err) => {
        setSignUpError(true);
      });
    }
  };

  return (
    <>
      <form action='signUp' onSubmit={handleSignUp} className='signUp-form'>
        <Avatar sx={{ m: 0, bgcolor: 'secondary.main' }} id='lockOut'>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h2' variant='h6' id='signTitle'>
          Sign up
        </Typography>
        <>
          <ThemeProvider theme={theme}>
            {/* <CssBaseline /> */}
            <TextField
              autoComplete='given-name'
              name='userName'
              required
              id='firstName'
              label='User Name'
              value={userName}
              inputProps={{
                style: theme.inputTextEmail,
              }}
              InputLabelProps={{
                style: theme.inputLabel,
              }}
              onChange={(e) => {
                setUserName(e.target.value);
                setSignUpError(false);
              }}
            />
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
                setSignUpError(false);
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
                setSignUpError(false);
                setPasswordError(false);
              }}
            />
            <Button type='submit' variant='contained' sx={{ mt: 3 }}>
              Sign Up
            </Button>
          </ThemeProvider>
        </>

        {passwordError && (
          <div className='textError'>
            Password must contain minimum 8 characters with at least : <br />- 1
            uppercase (A-Z) <br /> - 1 lowercase (a-z) <br />
            - 1 number (0-9) <br />- 1 symbol (@#%!_$...)
          </div>
        )}
        {signUpError && <div className='textError'>Email is already used </div>}
      </form>
    </>
  );
};

export default SignUp;
