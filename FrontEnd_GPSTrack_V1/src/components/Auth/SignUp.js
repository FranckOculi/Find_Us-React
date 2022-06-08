import React, { useState, useRef } from 'react';

import { isStrongPassword } from 'validator';
import UseAuth from '../../hooks/UseAuth';
import AuthMaterial from '../../UI/Auth/AuthMaterial';
import Input from '../../UI/Auth/InputAuth';

const SignUp = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
  });
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [passwordError, setPasswordError] = useState(false);
  const [signUpError, setSignUpError] = useState(false);

  const { createAccount } = UseAuth();
  const { AuthAvatar, PersonalTypography, SignUpButton } = AuthMaterial();

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
    setSignUpError(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!isStrongPassword(formData.password)) {
      setPasswordError(true);
    } else if (formData.userName && formData.email && formData.password) {
      const data = {
        pseudo: formData.userName,
        mail: formData.email.toLowerCase(),
        motDePasse: formData.password,
      };

      return await createAccount(data).catch((err) => {
        setSignUpError(true);
      });
    }
  };

  return (
    <>
      <form action='signUp' onSubmit={handleSignUp} className='signUp-form'>
        <AuthAvatar></AuthAvatar>{' '}
        <PersonalTypography>Sign up</PersonalTypography>
        <>
          <Input
            required
            type='text'
            id='firstName'
            label='User Name'
            name='userName'
            autoComplete='given-name'
            onChange={onChange}
            ref={userNameRef}
          />
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
          <SignUpButton>Sign Up</SignUpButton>
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
