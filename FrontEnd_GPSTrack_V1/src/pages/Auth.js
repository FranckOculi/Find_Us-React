import React, { useState, Fragment } from 'react';
import Header from '../components/layout/Header';
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

const Auth = () => {
  const [authModal, setAuthModal] = useState(true);

  const stateChange = () => {
    setAuthModal(!authModal);
  };

  const handleForgotEmail = () => {
    console.log('en attente redirection (password) ');
  };

  return (
    <>
      <div className='auth'>
        <Header />
        {authModal ? (
          <SignIn handleForgotEmail={handleForgotEmail} />
        ) : (
          <SignUp />
        )}

        <Grid item>
          <Link
            href='#'
            variant='body2'
            sx={{
              display: 'inline-block',
              marginTop: 4,
            }}
            onClick={() => {
              stateChange();
            }}
          >
            {authModal
              ? 'Dont have an account? Sign Up'
              : 'Already have an account? Sign in'}
          </Link>
        </Grid>
      </div>
    </>
  );
};

export default Auth;
