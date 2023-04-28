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
  console.log('firebaseError:', firebaseError);
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
        className='flex flex-col items-center w-full justify-center gap-y-3'
      >
        <Input
          id='email'
          name='email'
          label='Email'
          value={loginForm.email}
          onChange={onChange}
        />
        {/* error */}
        <em className='text-red-500 text-sm text-center block -mt-2'>
          {formError ||
            FIREBASE_ERRORS[
              firebaseError?.message as keyof typeof FIREBASE_ERRORS
            ]}
        </em>
        <em className='text-blue text-xs block -mt-3'>
          {isEmailSend && 'Email sent successfully. Please check your inbox.'}
        </em>

        <ButtonBg
          type='submit'
          loading={loading}
          background='orange'
          className='w-full flex justify-center py-4'
        >
          Reset Password
        </ButtonBg>
      </form>
      {/* link */}
      <div className='block text-sm my-4'>
        Go back to
        <p
          onClick={handleRedirectLoginPage}
          className='underline inline cursor-pointer text-blue font-semibold'
        >
          {' '}
          Log In
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
