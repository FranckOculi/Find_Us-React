import React, { useState, useRef } from 'react';

import UseAuth from '../../hooks/UseAuth';
import AuthMaterial from '../../UI/Auth/AuthMaterial';
import Input from '../../UI/Auth/InputAuth';

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const emailRef = useRef();
  const passwordRef = useRef();
  const [signInError, setSignInError] = useState(false);
  const {
    AuthAvatar,
    PersonalTypography,
    PersonalGrid,
    PersonalLink,
    SignInButton,
  } = AuthMaterial();

  const { login } = UseAuth();

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
    setSignInError(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      const data = {
        mail: formData.email.toLowerCase(),
        motDePasse: formData.password,
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
        <AuthAvatar></AuthAvatar>
        <PersonalTypography>SignIn</PersonalTypography>
        <Input
          required
          type='email'
          id='email'
          label='Email'
          name='email'
          autoComplete='email'
          onChange={onChange}
          ref={emailRef}
        />
        <Input
          required
          type='password'
          id='password'
          label='Password'
          name='password'
          autoComplete='current-password'
          onChange={onChange}
          ref={passwordRef}
        />
        <PersonalGrid>
          <PersonalLink href={'#'}>Forgot password?</PersonalLink>
        </PersonalGrid>
        <SignInButton>Sign In</SignInButton>
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
