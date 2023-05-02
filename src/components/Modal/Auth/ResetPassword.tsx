import React, { useState } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';

import { authModalState } from 'src/atoms';
import { ButtonBg } from 'src/components/common';
import { auth } from 'src/firebase/clientApp';
import { FIREBASE_ERRORS } from 'src/firebase/constants';

import Input from './Input';

const ResetPassword = () => {
  const setAuthModal = useSetRecoilState(authModalState);

  const [formError, setFormError] = useState<string>('');
  const [isEmailSend, setIsEmailSend] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
  });
  const [sendPasswordResetEmail, loading, firebaseError] =
    useSendPasswordResetEmail(auth);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleRedirectLoginPage = () => {
    setAuthModal(prev => ({ ...prev, view: 'login' }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEmailSend(false);
    const { email } = loginForm;
    if (!email) {
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
    setFormError('');
    sendPasswordResetEmail(email);

    setTimeout(() => {
      // check if there is no error show message
      if (!firebaseError) setIsEmailSend(true);
    }, 1000);
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
        {/* error */}
        <em className='-mt-2 block text-center text-sm text-red-500'>
          {formError ||
            FIREBASE_ERRORS[
              firebaseError?.message as keyof typeof FIREBASE_ERRORS
            ]}
        </em>
        <em className='-mt-3 block text-xs text-blue'>
          {isEmailSend && 'Email sent successfully. Please check your inbox.'}
        </em>

        <ButtonBg
          type='submit'
          loading={loading}
          color='orange'
          animation
          className='flex w-full justify-center py-4'
        >
          Reset Password
        </ButtonBg>
      </form>
      {/* link */}
      <div className='my-4 block text-sm'>
        Go back to
        <p
          onClick={handleRedirectLoginPage}
          className='inline cursor-pointer font-semibold text-blue underline'
        >
          {' '}
          Log In
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
