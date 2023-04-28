import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';

import { authModalState } from 'src/atoms';
import { ButtonBg } from 'src/components/common';
import { auth } from 'src/firebase/clientApp';
import { FIREBASE_ERRORS } from 'src/firebase/constants';

import Input from './Input';

const SignUp = () => {
  const setAuthModal = useSetRecoilState(authModalState);
  const [formError, setFormError] = useState<string>('');
  const [loginForm, setSignUpForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [createUserWithEmailAndPassword, , loading, firebaseError] =
    useCreateUserWithEmailAndPassword(auth);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleRedirectLoginPage = () => {
    setAuthModal({
      open: true,
      view: 'login',
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, confirmPassword } = loginForm;
    if (!email || !password || !confirmPassword) {
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
    if (password !== confirmPassword) {
      setFormError('Password does not match');
      return;
    }
    setFormError('');
    createUserWithEmailAndPassword(email, password);
  };

  return (
    <div className='flex flex-col gap-y-2'>
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
        <Input
          id='confirmPassword'
          name='confirmPassword'
          label='Confirm Password'
          type='password'
          value={loginForm.confirmPassword}
          onChange={onChange}
        />
        {/* error */}
        <em className='block text-center text-sm text-red-500'>
          {formError ||
            FIREBASE_ERRORS[
              firebaseError?.message as keyof typeof FIREBASE_ERRORS
            ]}
        </em>
        {/* link */}
        <ButtonBg
          background='orange'
          type='submit'
          className='mt-5 flex w-full justify-center py-4'
          loading={loading}
        >
          Sign Up
        </ButtonBg>
      </form>

      {/* link */}
      <div className='my-4 block text-sm'>
        Already a redditor?
        <p
          onClick={handleRedirectLoginPage}
          className='inline cursor-pointer font-semibold text-blue underline'
        >
          {' '}
          Log in
        </p>
      </div>
    </div>
  );
};

export default SignUp;
