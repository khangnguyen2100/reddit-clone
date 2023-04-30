import React from 'react';
import { useRecoilValue } from 'recoil';

import { authModalState } from 'src/atoms';

import Login from '../../../Modal/Auth/Login';
import SignUp from '../../../Modal/Auth/SignUp';
import ResetPassword from '../../../Modal/Auth/ResetPassword';

const AuthInputs = () => {
  const authState = useRecoilValue(authModalState);
  return (
    <div className='mt-2 w-full'>
      {authState.view === 'login' && <Login />}
      {authState.view === 'signup' && <SignUp />}
      {authState.view === 'resetPassword' && <ResetPassword />}
    </div>
  );
};

export default AuthInputs;
