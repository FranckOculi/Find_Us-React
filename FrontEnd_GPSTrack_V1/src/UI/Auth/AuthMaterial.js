import React from 'react';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import AppTheme from '../../theme/AppTheme';

const AuthMaterial = () => {
  const { getTheme } = AppTheme();
  const theme = getTheme('Auth');

  const AuthAvatar = () => {
    return (
      <Avatar sx={{ m: 0, bgcolor: 'secondary.main' }} id='lockOut'>
        <LockOutlinedIcon />
      </Avatar>
    );
  };

  const PersonalTypography = ({ children }) => {
    return (
      <Typography component='h2' variant='h6' id='signTitle'>
        {children}
      </Typography>
    );
  };

  const PersonalGrid = ({ children }) => {
    return (
      <Grid
        item
        xs
        sx={{
          mb: 2,
        }}
      >
        {children}
      </Grid>
    );
  };

  const PersonalLink = ({ href, children }) => {
    return (
      <Link
        href={href}
        variant='body2'
        sx={{
          marginLeft: 17,
          alignSelf: 'end',
        }}
      >
        {children}
      </Link>
    );
  };

  const SignInButton = ({ children }) => {
    return (
      <Button type='submit' variant='contained'>
        {children}
      </Button>
    );
  };

  const SignUpButton = ({ children }) => {
    return (
      <Button type='submit' variant='contained' sx={{ mt: 3 }}>
        {children}
      </Button>
    );
  };

  return {
    AuthAvatar,
    PersonalTypography,
    PersonalGrid,
    PersonalLink,
    SignInButton,
    SignUpButton,
  };
};
export default AuthMaterial;
