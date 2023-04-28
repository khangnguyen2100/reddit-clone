import React from 'react';
import { useRecoilValue } from 'recoil';

import { authModalState } from 'src/atoms';

import Login from './Login';
import SignUp from './SignUp';
import ResetPassword from './ResetPassword';

const AuthInputs = () => {
  const authState = useRecoilValue(authModalState);
  return (
    <div className='w-full mt-2'>
      {authState.view === 'login' && <Login />}
      {authState.view === 'signup' && <SignUp />}
      {authState.view === 'resetPassword' && <ResetPassword />}
    </div>
  );
};

export default AuthInputs;
