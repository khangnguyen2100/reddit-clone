import React, { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';

import { authModalState } from 'src/atoms';
import { ButtonBg } from 'src/components/common';
import { auth } from 'src/firebase/clientApp';
import { FIREBASE_ERRORS } from 'src/firebase/constants';

import Input from './Input';
import OAuth from './OAuth';

const Login = () => {
  const setAuthModal = useSetRecoilState(authModalState);

  const [formError, setFormError] = useState<string>('');
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [signInWithEmailAndPassword, , loading, firebaseError] =
    useSignInWithEmailAndPassword(auth);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleRedirectSignUpPage = () => {
    setAuthModal(prev => ({ ...prev, view: 'signup' }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = loginForm;
    if (!email || !password) {
      setFormError('Please fill all fields');
      return;
    }
    if (
      !email.includes('@') ||
      !email.includes('.') ||
      email.length < 5 ||
      email.length > 50
    ) {
      setFormError('Invalid email');
      return;
    }
    if (password.length < 6 || password.length > 50) {
      setFormError('Password must be between 6 and 50 characters');
      return;
    }
    setFormError('');
    signInWithEmailAndPassword(email, password);
  };

  return (
    <div className='flex flex-col gap-y-2'>
      <OAuth />

      {/* inputs */}
      <form
        onSubmit={handleSubmit}
        className='flex w-full flex-col items-center justify-center gap-y-3'
      >
        <Input
          id='email'
          name='email'
          label='Email'
          value={loginForm.email}
          onChange={onChange}
        />
        <Input
          id='password'
          name='password'
          label='Password'
          type='password'
          value={loginForm.password}
          onChange={onChange}
        />
        {/* error */}
        <em className='-mt-2 block text-center text-sm text-red-500'>
          {formError ||
            FIREBASE_ERRORS[
              firebaseError?.message as keyof typeof FIREBASE_ERRORS
            ]}
        </em>
        {/* link */}
        <div className='my-4 block text-sm'>
          Forgot your
          <p
            onClick={() => {
              setAuthModal(prev => ({ ...prev, view: 'resetPassword' }));
            }}
            className='inline cursor-pointer font-semibold text-blue underline'
          >
            {' '}
            password?
          </p>
        </div>
        <ButtonBg
          type='submit'
          loading={loading}
          background='orange'
          className='flex w-full justify-center py-4'
        >
          Log In
        </ButtonBg>
      </form>
      {/* link */}
      <div className='my-4 block text-sm'>
        New to Reddit?
        <p
          onClick={handleRedirectSignUpPage}
          className='inline cursor-pointer font-semibold text-blue underline'
        >
          {' '}
          Sign Up
        </p>
      </div>
    </div>
  );
};

export default Login;
