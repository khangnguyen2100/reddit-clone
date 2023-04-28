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
        className='flex flex-col items-center w-full justify-center gap-y-3'
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
        <em className='text-red-500 text-sm text-center block'>
          {formError ||
            FIREBASE_ERRORS[
              firebaseError?.message as keyof typeof FIREBASE_ERRORS
            ]}
        </em>
        {/* link */}
        <ButtonBg
          background='orange'
          type='submit'
          className='w-full flex justify-center py-4 mt-5'
          loading={loading}
        >
          Sign Up
        </ButtonBg>
      </form>

      {/* link */}
      <div className='block text-sm my-4'>
        Already a redditor?
        <p
          onClick={handleRedirectLoginPage}
          className='underline inline cursor-pointer text-blue font-semibold'
        >
          {' '}
          Log in
        </p>
      </div>
    </div>
  );
};

export default SignUp;
